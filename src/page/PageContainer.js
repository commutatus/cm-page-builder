import React from 'react'
import '../styles/page.css'
import { PermissionContext } from '../contexts/permission-context';
import {PageDetails} from './PageDetails'
import { sortDataOnPos, compareAndDiff } from '../utils/helpers';
import '../styles/global.css'

class PageContainer extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			pageComponents: sortDataOnPos(props.pageComponents) || [{content: '', position: 1, component_type: 'AddComponent', currentType: 'Text' }],
			meta: props.meta,
			actionDomRect: null
		}
	}

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

	componentDidMount() {
		setTimeout(this.checkPageHeight, 1000)
	}

	componentDidUpdate(){
		this.checkPageHeight();
		if(this.newElemPos){
			document.querySelector(`[data-id=AddComponent-${this.newElemPos}]`).focus()
			this.newElemPos = null
		}
		if(this.state.actionDomRect){
			document.addEventListener('mousedown', this.handlePageClick)
		}
	}

	componentWillReceiveProps(nextProps) {
		let pageComponents = compareAndDiff(this.state.pageComponents, sortDataOnPos(nextProps.pageComponents))
		console.log(pageComponents)
		this.setState({ pageComponents, meta: nextProps.meta })
	}

	handlePageClick = (e) => {
		let editTooltip = document.getElementById('cm-text-edit-tooltip')
		if(editTooltip && !editTooltip.contains(e.target)){
			this.setState({actionDomRect: null})
		}else{
			document.removeEventListener('mousedown', this.handlePageClick)
		}
	}

	emitUpdate = (...args) => {
		let {handleUpdate} = this.props
		if(handleUpdate)
			handleUpdate(...args)
	}

	_getCurrentOrder = (currentIndex) => {
		if (typeof this._getCurrentOrder.counter == 'undefined')
			this._getCurrentOrder.counter = 1
		if (this.state.pageComponents[currentIndex-1] && this.state.pageComponents[currentIndex-1].component_type === `ordered_list`)
			this._getCurrentOrder.counter++
		else 
			this._getCurrentOrder.counter = 1
		return this._getCurrentOrder.counter
	}

	getPageComponent = (data, index) => {
		let order = 0
		let typeName = data.component_type === 'AddComponent' ? data.component_type : this.props.typeMapping[data.component_type] ?  this.props.typeMapping[data.component_type] : 'Text'
		let dataId = data.component_type !== 'AddComponent' ? data.id : `${data.component_type}-${index}`
		if (data.currentType === 'Olist') 
			order = this._getCurrentOrder(index)
		if(typeName){
			let Component = require(`../components/${typeName}`)[typeName]
			return (
				<Component 
					key={dataId}
					content={data.content}
					handleUpdate={this.emitUpdate}
					id={dataId}
					currentType={data.currentType ? data.currentType : data.component_type}
					position={data.position}
					order={order}
				/>
			)
		}
	}

	handleAction = (type, id, elem) => {
		let {pageComponents} = this.state
		let temp = [], position = 1, componentIndex = id
		if(id && id.includes('AddComponent')){
			id = +(id.split('-')[1])
		}
		switch(type){
			case 'add-component':
				for(let i in pageComponents){
					let componentId = componentIndex && componentIndex.includes('AddComponent') ? i : pageComponents[i].id
					if(id == componentId){ //can compare with the id also.
						temp.push({...pageComponents[i], position})
						this.newElemPos = position
						temp.push({content: '', position: position+1, component_type: 'AddComponent', currentType:"Text" })
						position += 2
					}
					else{
						temp.push({...pageComponents[i], position})
						position++
					}
				}
				this.setState({pageComponents: temp})
				break
			case 'olist':
				for(let i in pageComponents){
					let componentId = componentIndex && componentIndex.includes('AddComponent') ? i : pageComponents[i].id
					if(id == componentId){ //can compare with the id also.
						temp.push({...pageComponents[i], position})
						this.newElemPos = position
						temp.push({content: '', position: position+1, component_type: 'AddComponent', currentType:"Olist" })
						position += 2
					}
					else{
						temp.push({...pageComponents[i], position})
						position++
					}
				}
				this.setState({pageComponents: temp})
				break
			case 'remove-component':
				let rmCompId = -1
				if(pageComponents.length > 1){
					for(let i in pageComponents){
						let componentId = componentIndex && componentIndex.includes('AddComponent') ? i : pageComponents[i].id
						let isNewComponent = componentIndex.includes('AddComponent')
						if(id == componentId){ //can compare with the id also.
							if(!isNewComponent){
								rmCompId = componentId
							}
							continue
						}
						else{
							temp.push({...pageComponents[i], position})
							position++
						}
					}
					this.setState({pageComponents: temp}, () => {
						this.emitUpdate(null, rmCompId)
					})
				}

				break
		}
	}


	handleMouseUp = (e) => {
		this.handleSelection(e)
	}

	
	handleKeyPressList = (e) => {
		let elem = e.target
		switch(e.key){
			case 'ArrowUp':
				let prevSibling = elem.parentElement.parentElement.previousElementSibling
				if(prevSibling){
					prevSibling.firstChild.firstChild.focus()
				}
				break;
			case 'ArrowDown':
				let nextSibling = elem.parentElement.parentElement.nextElementSibling
				if(nextSibling){
					nextSibling.firstChild.firstChild.focus()
				}
				break;
		}
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
			document.execCommand('insertHTML', false, `<a href="${link}" rel="noopener noreferrer" target="_blank" contentEditable="false">${window.getSelection()}</a>`)
		}
		document.execCommand(action)
	}

	editComponent = (e) => {
		e.preventDefault()
		let {pageComponents} = this.state
		let type = e.currentTarget.dataset.type
		let componentId = this.currentElemSelection.elemId
		if(componentId){
			let isNewComponent = false
			if(componentId.includes('AddComponent')){
				componentId = componentId.split('-')[1]
				isNewComponent = true
			}
			pageComponents = pageComponents.map((component, index) => {
				if(isNewComponent && componentId == index){
					return({...component, currentType: type})
				}
				return({...component, component_type: type}) 
			})	
		}
		this.setState({pageComponents, actionDomRect: null})
	}

	render() {
		const { pageComponents, meta, actionDomRect } = this.state
		return (
			<div
				className="cm-page-builder"
				id="page-builder"
				onKeyUp={this.handelKeyPress}
			>
				<PermissionContext.Provider value={{status: "Read" || this.props.status || 'Edit' , handleAction: this.handleAction}}> 
					<PageDetails 
						pageComponents={pageComponents}
						emitUpdate={this.emitUpdate}
						meta={meta}
						onMouseUp={this.handleMouseUp}
						onKeyDown={this.handleKeyPressList}
						getPageComponent={this.getPageComponent}
						requestHandler={this.props.requestHandler}
						pageCategories={this.props.pageCategories}
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
						<div className="divider"></div>
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
						</div>
					</div>
					:
					''
				}
			</div>
		)
	}
}

export default PageContainer
