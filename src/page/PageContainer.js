import React from 'react'
import '../styles/page.css'
import { PermissionContext } from '../contexts/permission-context';
import {PageDetails} from './PageDetails'
import { sortDataOnPos, compareAndDiff } from '../utils/helpers';
import '../styles/global.css'
import { connect } from 'react-redux';
import AddComponent from '../components/AddComponent';

class PageContainer extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			meta: props.meta,
			actionDomRect: null
		}
		// this.newOrder = 0
		this.currentListOrder = 1
	}

	// componentDidMount() {
	// 	setTimeout(this.checkPageHeight, 1000)
	// }
	
	// componentWillReceiveProps(nextProps) {
	// 	let pageComponents = compareAndDiff(this.state.pageComponents, this.getPageComponentList(nextProps))
	// 	pageComponents = this.handleNonTextComponent(pageComponents, nextProps)
	// 	this.setState({ pageComponents, meta: nextProps.meta })
	// }
	
	// componentDidUpdate(){
	// 	this.currentListOrder = 1
	// 	this.checkPageHeight();
	// 	if(this.newElemPos){
	// 		document.querySelector(`[data-id=AddComponent-${this.newElemPos}]`).focus()
	// 		this.newElemPos = null
	// 	}
	// 	if(this.state.actionDomRect){
	// 		document.addEventListener('mousedown', this.handlePageClick)
	// 	}
	// }

	// handleNonTextComponent = (pageComponents, props) => {
	// 	if(props.status === 'Edit'){
	// 		let data = []
	// 		pageComponents.map((component, i) => {
	// 			data.push(component)
	// 			if(
	// 					(['image', 'divider', 'video'].includes(component.component_type)) && 
	// 					(
	// 						pageComponents[i+1] && pageComponents[i+1].component_type !== 'AddComponent' || !pageComponents[i+1]
	// 					)
	// 				){
	// 				data.push({content: '', position: i+2, component_type: 'AddComponent', currentType: 'Text'})
	// 			}
	// 		})
	// 		return data
	// 	}else{
	// 		return pageComponents
	// 	}
	// }
	
	// getPageComponentList = (props) => {
	// 	if(props.status === 'Edit'){
	// 		return props.pageComponents.length > 0 ? sortDataOnPos(props.pageComponents) : [{content: '', position: 1, component_type: 'AddComponent', currentType: 'Text' }]
	// 	}else{
	// 		return sortDataOnPos(props.pageComponents)
	// 	}
	// }

	checkPageHeight() {
		let pageElem = document.getElementById('page-builder');
		let commentElem = document.getElementById('page-comment-box');
		if(pageElem && commentElem) {
			let totalElemHeight = pageElem.scrollHeight + commentElem.offsetHeight + pageElem.getBoundingClientRect().top;
			if(totalElemHeight < window.innerHeight) {
				commentElem.style.bottom = 0;
			} else {
				commentElem.style.bottom = 'unset';
			}
		}
	}
	
	handlePageClick = (e) => {
		let editTooltip = document.getElementById('cm-text-edit-tooltip')
		if(editTooltip && !editTooltip.contains(e.target)){
			this.setState({actionDomRect: null})
		}else{
			document.removeEventListener('mousedown', this.handlePageClick)
		}
	}

	emitUpdate = (data, id, type, key) => {
		// let {handleUpdate} = this.props
		// let {pageComponents} = this.state
		// if(data && !id && type !== 'meta'){
		// 	let newType = this.props.REVERSE_TYPE_MAP_COMPONENT[data.component_type]
		// 	pageComponents = pageComponents.map(component => +component.position === +data.position ? {...component, ...data, component_type: newType, currentType: newType} : component)
		// }
		// this.setState({pageComponents})
		// if(handleUpdate)
		// 	handleUpdate(data, id, type, key)
	}

	// _getCurrentOrder = (currentIndex) => {
		
	// 	if (typeof this._getCurrentOrder.counter == 'undefined')
	// 		this._getCurrentOrder.counter = 1
	// 	if (this.state.pageComponents[currentIndex-1] && this.state.pageComponents[currentIndex-1].component_type === `ordered_list`) {
	// 		this._getCurrentOrder.counter = this.newOrder === 1 ? this.newOrder+1 : this._getCurrentOrder.counter+1
	// 		this.newOrder = 0
	// 	}
	// 	else 
	// 		this._getCurrentOrder.counter = 1
	// 	return this._getCurrentOrder.counter 
	// }

	getPageComponent = (data, index) => {
		let order = 1
		let typeName = data.componentType
		// console.log(data, this.props.typeMapping, this.props.typeMapping[data.component_type])
		let dataId = data.id
		// if (data.currentType === 'Olist' || data.component_type === `ordered_list`) {
		// 	order = this.currentListOrder
		// 	this.currentListOrder++
		// }else{
		// 	this.currentListOrder = 1
		// }
		if(typeName){
			let Component = require(`../components/${typeName}`)[typeName]
			return (
				<AddComponent key={dataId} id={dataId}>
					<Component 
						data={data}
						handleUpdate={this.emitUpdate}
					/>
				</AddComponent>
			)
		}
	}

	handleMouseUp = (e) => {
		this.handleSelection(e)
	}
	
	handleSelection = (e) => {
		let selection = window.getSelection()
		if(selection.toString()){
			let dimensions = selection.getRangeAt(0).getBoundingClientRect()
			this.currentElemSelection = {elemId: e.target.dataset.id, selection}
			this.setState({actionDomRect: dimensions})
		}
		else{
			this.currentElemSelection = null
		}
	}

	editText = (e) => {
		e.preventDefault()
		let action = e.currentTarget.dataset.action
		if(action === 'createLink'){
			let link = prompt('Enter a link')
			document.execCommand('insertHTML', false, `<a href="${link}" rel="noopener noreferrer" target="_blank" contenteditable="false">${window.getSelection()}</a>`)
		}else{
			document.execCommand(action)
		}
	}

	render() {
		const { pageComponents, meta, actionDomRect } = this.state
		const {appData} = this.props
		return (
			<div
				className="cm-page-builder"
				id="page-builder"
				onKeyUp={this.handelKeyPress}
			>
				<PermissionContext.Provider value={{status: this.props.status || 'Edit'}}> 
					<PageDetails 
						pageComponents={appData.componentData}
						emitUpdate={this.emitUpdate}
						meta={meta}
						onMouseUp={this.handleMouseUp}
						onKeyDown={this.handleKeyPressList}
						getPageComponent={this.getPageComponent}
						requestHandler={this.props.requestHandler}
						pageCategories={this.props.pageCategories}
						currentOffices={this.props.currentOffices}
						isEditMode={this.props.status === 'Edit'}
					/>
				</PermissionContext.Provider>
				{
					actionDomRect && actionDomRect.top && this.props.status === 'Edit' ?
					<div className="text-selection-tool" id="cm-text-edit-tooltip" style={{top: actionDomRect.top - actionDomRect.height, left: actionDomRect.left}}>
						<div className="bold-tool-btn" onMouseDown={this.editText} data-action="bold">B</div>
						<div className="tool-btn" onMouseDown={this.editText} data-action="italic">
							<i className="cm-italic" />
						</div>
						<div className="tool-btn" onMouseDown={this.editText} data-action="strikeThrough">
							<i className="cm-strikethrough" />
						</div>
						<div className="tool-btn" onMouseDown={this.editText} data-action="createLink">
							<i className="cm-link" />
						</div>
						{/* <div className="divider"></div>
						<div className="tool-btn" onMouseDown={this.editComponent} data-type="Header1">
							<i className="cm-h1" />
						</div>
						<div className="tool-btn" onMouseDown={this.editComponent} data-type="Header2">
						<i className="cm-h2" />
						</div>
						<div className="tool-btn">
							<i className="cm-bullets" />
						</div>
						<div className="tool-btn">
							<i className="cm-numbers" />
						</div> */}
					</div>
					:
					''
				}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	appData: state.appData
})

export default connect(mapStateToProps)(PageContainer)
