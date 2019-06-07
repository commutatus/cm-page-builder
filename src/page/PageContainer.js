import React from 'react'
import '../styles/page.css'
import { PermissionContext } from '../contexts/permission-context';
import {PageDetails} from './PageDetails'
// import {MoreActions} from '../utils/MoreActions'
import '../styles/global.css'

class PageContainer extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			pageComponents: props.pageComponents || [{content: '', position: 1, component_type: 'AddComponent', currentType: 'Text' }],
			meta: props.meta,
		}
	}

	componentDidUpdate(){
		if(this.newElemPos){
			document.querySelector(`[data-id=AddComponent-${this.newElemPos}]`).focus()
			this.newElemPos = null
		}
	}

	emitUpdate = (data, type) => {
		let {handleUpdate} = this.props
		if(handleUpdate)
			handleUpdate({data, type})
	}

	getPageComponent = (data, index) => {
		// console.log(data)
		let typeName = data.component_type === 'AddComponent' ? data.component_type : this.props.typeMapping[data.component_type]
		let dataId = data.component_type !== 'AddComponent' ? data.id : `${data.component_type}-${index}`
		let Component = require(`../components/${typeName}`)[typeName]
		return (
			<Component 
				key={dataId}
				content={data.content}
				handleUpdate={this.emitUpdate}
				id={dataId}
				currentType={data.currentType}
			/>
		)
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
			case 'remove-component':
				if(pageComponents.length > 1){
					for(let i in pageComponents){
						let componentId = componentIndex && componentIndex.includes('AddComponent') ? i : pageComponents[i].id
						if(id == componentId){ //can compare with the id also.
							// this.elemDelPos = pos
							continue
						}
						else{
							temp.push({...pageComponents[i], position})
							position++
						}
					}
					this.setState({pageComponents: temp})
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
			// console.log(e.target.dataset.id)
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
		console.log(pageComponents)
		this.setState({pageComponents, actionDomRect: null})
	}

	render() {
		const { pageComponents, meta, actionDomRect } = this.state
		console.log(this.state)
		return (
			<div>
				<PermissionContext.Provider value={{status: 'Edit', handleAction: this.handleAction}}> 
					<PageDetails 
						pageComponents={pageComponents}
						emitUpdate={this.emitUpdate}
						meta={meta}
						onMouseUp={this.handleMouseUp}
						onKeyDown={this.handleKeyPressList}
						getPageComponent={this.getPageComponent}
					/>
				</PermissionContext.Provider>
				{
					actionDomRect && actionDomRect.top && 
					<div className="text-selection-tool" style={{top: actionDomRect.top - actionDomRect.height - 5, left: actionDomRect.left}}>
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
				}
			</div>
		)
	}
}

export default PageContainer






const dummy = [{ "id": "2670", "name": "Contract signed", "short_name": null, "position": 5, "type_id": "employee_follow_up", "type_name": "employee_follow_up", "parent_id": null }, { "id": "2666", "name": "First Contact", "short_name": null, "position": 2, "type_id": "employee_follow_up", "type_name": "employee_follow_up", "parent_id": null }, { "id": "2671", "name": "Follow up", "short_name": null, "position": 6, "type_id": "employee_follow_up", "type_name": "employee_follow_up", "parent_id": null }, { "id": "2711", "name": "Lead", "short_name": null, "position": 1, "type_id": "employee_follow_up", "type_name": null, "parent_id": null }, { "id": "2668", "name": "Meeting scheduled", "short_name": null, "position": 4, "type_id": "employee_follow_up", "type_name": "employee_follow_up", "parent_id": null }, { "id": "2667", "name": "Proposal sent", "short_name": null, "position": 3, "type_id": "employee_follow_up", "type_name": "employee_follow_up", "parent_id": null }]