import React from 'react'
import Sortable from 'sortablejs'
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { PermissionContext } from '../contexts/permission-context';
import {PageDetails} from './PageDetails'
import AddComponent from '../components/AddComponent';
import {
	initComponents,
	addNewComponent,
	updatePosition
} from '../redux/reducers/appDataReducers'
import {
	setCurrentElem,
	removeCurrentElem
} from '../redux/reducers/currentElemReducer'
import '../styles/global.css'
import '../styles/page.css'
import '../styles/animations.css'
class PageContainer extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			meta: props.meta,
			actionDomRect: null,
			activeFormatting: []
		}
		this.currentListOrder = 1
	}

	componentWillMount() {
		this.initWindowVar(this.props)
		this.props.initComponents(this.props.pageComponents)
	}

	componentWillReceiveProps(newProps){
		this.initWindowVar(newProps)
	}

	initWindowVar(props){
		window.cmPageBuilder = {
			handleUpdate: props.handleUpdate,
			pid: props.meta && props.meta.id
		}
	}

	componentDidMount() {
		if(!this.dragContext){
			let el = document.getElementById('component-list')
			this.dragContext = Sortable.create(el, {
				name: 'componentList',
				handle: ".component-dragger",
				onEnd: (e) => {
					let {newIndex, oldIndex} = e
					this.props.updatePosition({oldIndex, newIndex})
				}
			})
		}
	}
	
	componentDidUpdate(){
		if(this.state.actionDomRect){
			document.addEventListener('mousedown', this.handlePageClick)
		}
		PageContainer.contextType = PermissionContext
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
	
	handlePageClick = (e) => {
		let editTooltip = document.getElementById('cm-text-edit-tooltip')

		if(editTooltip && !editTooltip.contains(e.target)){
			this.setState({actionDomRect: null})
		}else{
			document.removeEventListener('mousedown', this.handlePageClick)
		}
	}

	emitUpdate = (...args) => {
		console.log(args)
		if(this.props.handleUpdate){
			// if(args[2] === 'updateTitle'){
			// 	args[1].office_id = +this.props.currentOffices[0].id
			// }
			this.props.handleUpdate(...args)
		}
	}

	_getCurrentOrder = (currentIndex) => {
		const { appData } = this.props
		if (typeof this._getCurrentOrder.counter === 'undefined')
			this._getCurrentOrder.counter = 1
		if (currentIndex > 0 && appData.componentData[currentIndex-1] && appData.componentData[currentIndex-1].componentType === `Olist`) {
			this._getCurrentOrder.counter++
		}
		else 
			this._getCurrentOrder.counter = 1
		return this._getCurrentOrder.counter 
	}

	getPageComponent = (data, index) => {
		let typeName = data.componentType
		let dataId = data.id
		if(typeName){
			let Component = require(`../components/${typeName}`)[typeName]
			return (
				<AddComponent key={dataId} id={dataId} data={data}>
					<Component 
						handleUpdate={this.emitUpdate}
						order={data.componentType === `Olist` && this._getCurrentOrder(index)}
					/>
				</AddComponent>
			)
		}
	}

	handleMouseUp = (e) => {
		e.persist()
		this.handleSelection(e)
		let conElem = document.querySelector(`[data-container-block="true"]`)
		if(conElem.offsetHeight < e.pageY){
			let {appData} = this.props
			let lastElem = appData.componentData[appData.componentData.length-1]
			if((!lastElem || lastElem.componentType !== 'Text' || lastElem.content) && !this.props.newPage ) {
				this.props.addNewComponent({id: lastElem && lastElem.id, componentType: 'Text'})
			}
		}
	}
	
	handleKeyPressList = (e) => {
		switch(e.key){
			case 'a':
				if (e.ctrlKey || e.metaKey) 
					this.handleSelection(e)
				break;				
		}
	}

	getScrollOffsets = () => {
		var w = window;

		// This works for all browsers except IE versions 8 and before
		if (w.pageXOffset != null) return {x: w.pageXOffset, y:w.pageYOffset};
		// For IE (or any browser) in Standards mode
		var d = w.document;
		if (document.compatMode == "CSS1Compat")
		return {x:d.documentElement.scrollLeft, y:d.documentElement.scrollTop};
		// For browsers in Quirks mode
		return { x: d.body.scrollLeft, y: d.body.scrollTop };
	}

	handleSelection = (e) => {
		let selection = window.getSelection()
		if(selection){
			let dimensions = selection.getRangeAt(0).getBoundingClientRect()
			this.currentElemSelection = {elemId: e.target.dataset.id, selection}
			if (dimensions.width > 1) {
				let scrollOffsets = this.getScrollOffsets()
				let actionDomRect = { top: dimensions.top+scrollOffsets.y - dimensions.height, left: dimensions.left+scrollOffsets.x }
				this.setState({actionDomRect})
			}
		}
		else{
			this.currentElemSelection = null
		}
	}

	editText = (e) => {
		e.stopPropagation()
		let { activeFormatting } = this.state
		let action = e.currentTarget.dataset.action
		console.log('current action', action)
		if(action === 'createLink'){
			if (!activeFormatting.includes(`createLink`)) {
				let link = prompt('Enter a link')
				document.execCommand('insertHTML', true, `<a href=${link} contenteditable="false" target="_blank">${window.getSelection().toString()}</a>`)	
			}
			else
				document.execCommand("unlink", false, false);
		}else
			document.execCommand(action)
		let index = activeFormatting.indexOf(action)
		if (index > -1)
			activeFormatting.splice(index, 1)
		else
			activeFormatting.push(action)
		console.log('active', activeFormatting)
		this.setState({ activeFormatting })
	}

	handleRangeSelection = (e) => {
		e.stopPropagation()
		let {activeFormatting} = this.state
		activeFormatting = []
		let node = e.target
		while(node.firstChild) {
			node = node.firstChild
			switch(node.nodeName) {
				case `A`:
					if (!activeFormatting.includes(`createLink`))
						activeFormatting.push(`createLink`)
					break
				case `B`:
					if (!activeFormatting.includes(`bold`))
						activeFormatting.push(`bold`)					
					break
				case `I`:
					if (!activeFormatting.includes(`italic`))
						activeFormatting.push(`italic`)						
					break
				case `STRIKE`:
					if (!activeFormatting.includes(`strikeThrough`))
						activeFormatting.push(`strikeThrough`)						
					break
				default:
					this.setState({ activeFormatting: [] })
					break
			}
		} 
		this.setState({ activeFormatting })
	}

	_createLink = (link) => {
		let sel, range
		if (window.getSelection && (sel = window.getSelection()).rangeCount) {
			range = sel.getRangeAt(0);
			range.collapse(true);
			var anchor = document.createElement("a") 
			anchor.href = link
			anchor.contentEditable = "false"
			anchor.appendChild( document.createTextNode(window.getSelection().toString()) );
			range.insertNode(anchor);
			// Move the caret immediately after the inserted span
			range.setStartAfter(anchor)
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
		}
	}

	showTooltip = () => {
		this.setState({ showTooltip: true })
	}

	hideTooltip = () => {
		this.setState({ showTooltip: false })
	}

	render() {
		const { meta, actionDomRect, activeFormatting } = this.state
		console.log('state', activeFormatting)
		const {appData} = this.props
		let isEdit = this.props.status === 'Edit'
		return (
			<div
				className="cm-page-builder"
				id="page-builder"
				onMouseUp={isEdit ? this.handleMouseUp : undefined}
			>
				<PermissionContext.Provider value={{status: this.props.status, emitUpdate: this.emitUpdate, handleSelection: this.handleRangeSelection}}> 
					<PageDetails 
						pageComponents={appData.componentData}
						emitUpdate={this.emitUpdate}
						meta={meta}
						getPageComponent={this.getPageComponent}
						requestHandler={this.props.requestHandler}
						pageCategories={this.props.pageCategories}
						currentOffices={this.props.currentOffices}
						isEditMode={isEdit}
						onMouseUp={isEdit ? this.handleMouseUp : undefined}
						onKeyDown={isEdit ? this.handleKeyPressList : undefined}
					/>
				</PermissionContext.Provider>
				<CSSTransition
					in={actionDomRect && actionDomRect.top && isEdit }
					timeout={400}
					classNames="dropdown-fade"
					onEnter={this.showTooltip}
					onExited={this.hideTooltip}
					unmountOnExit
				>
					<div className="text-selection-tool" id="cm-text-edit-tooltip" style={actionDomRect ? { top: actionDomRect.top, left: actionDomRect.left }: {display: 'none'}}>
						<div className={ activeFormatting.includes(`bold`) ? "bold-tool-btn-active" : "bold-tool-btn"} onMouseDown={this.editText} data-action="bold">B</div>
						<div className={ activeFormatting.includes(`italic`) ? "tool-btn-active" : "tool-btn"} onMouseDown={this.editText} data-action="italic">
							<i className="cm-italic" />
						</div>
						<div className={  activeFormatting.includes(`strikeThrough`) ? "tool-btn-active" : "tool-btn"} onMouseDown={this.editText} data-action="strikeThrough">
							<i className="cm-strikethrough" />
						</div>
						<div className={  activeFormatting.includes(`createLink`) ? "tool-btn-active" : "tool-btn"} onMouseDown={this.editText} data-action="createLink">
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
				</CSSTransition>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	appData: state.appData,
	currentElem: state.currentElem
})

const mapDispatchToProps = {
	addNewComponent,
	setCurrentElem,
	initComponents,
	removeCurrentElem,
	updatePosition
}

PageContainer.propTypes = {
	handleUpdate: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer)
