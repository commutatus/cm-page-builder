import React from 'react'
import '../styles/page.css'
import { Dropdown } from '../components/Dropdown';
import { EmojiIconContainer } from '../components/EmojiIconContainer';
import { Title } from '../components/Title'
import { AddComponent } from '../components/AddComponent'
import moment from 'moment'
import { Embed } from '../components/Embed';
import { Upload } from '../components/Upload';
import { PermissionContext } from '../contexts/permission-context';

const PageDetails = ({meta, emitUpdate, pageComponents, getPageComponent}) => 
	<div className="page-root-container">
		<div className="page-container">
			<EmojiIconContainer />
			<Title content={meta ? meta.title : ''} handleUpdate={emitUpdate} />
			<div className="page-info">
				<div className="seprator-dot"></div>
				<div className="current-user-detail">
					<img src={meta ? meta.creator.profile_photo : ''} />
					<p className="user-name">{meta ? meta.creator.full_name : ''}</p>
				</div>
				<div className="seprator-dot"></div>
				<div className="date-updated">{meta ? moment(meta.created_at).format('DD MMM, YYYY') : ''}</div>
			</div>
			{ 
				pageComponents.map((component, index) => getPageComponent(component, index))
			}
			<Embed />
			<Upload />
			<AddComponent handleUpdate={() => {}}></AddComponent>
		</div>
	</div>
class PageContainer extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			pageComponents: props.pageComponents || ['Header1', 'Header2', 'Text', ],
			meta: props.meta,
		}
	}

	componentWillMount(){
		window.addEventListener('keydown', this.handleKeyPress)
	}

	handleKeyPress = (e) => {
		console.log(e)
		e.preventDefault()
		let referenceNode = document.activeElement
		if(referenceNode){
			switch(e.key){
				case 'Backspace':
					break;
				case 'Enter':
					break;
			}
		}
	}

	emitUpdate = (data, type, id) => {
		let {handleUpdate} = this.props
		if(handleUpdate)
			handleUpdate(data, type, id)
	}

	getPageComponent = (data, index) => {
		let typeName = data || this.props.typeMapping[data.component_type]
		let Component = require(`../components/${typeName}`)[typeName]
		return (
			<Component 
				key={`${data.component_type}-${index}`} 
				content={data.content}
				handleUpdate={this.emitUpdate}
			/>
		)
	}

	// handleSelect = () => {

	// }

	render() {
		const { pageComponents, meta } = this.state
		return (
			<PermissionContext.Provider value="Read"> 
				<PageDetails 
					pageComponents={pageComponents}
					emitUpdate={this.emitUpdate}
					meta={meta}
					getPageComponent={this.getPageComponent}
				/>
			</PermissionContext.Provider>
		)
	}
}

export default PageContainer






const dummy = [{ "id": "2670", "name": "Contract signed", "short_name": null, "position": 5, "type_id": "employee_follow_up", "type_name": "employee_follow_up", "parent_id": null }, { "id": "2666", "name": "First Contact", "short_name": null, "position": 2, "type_id": "employee_follow_up", "type_name": "employee_follow_up", "parent_id": null }, { "id": "2671", "name": "Follow up", "short_name": null, "position": 6, "type_id": "employee_follow_up", "type_name": "employee_follow_up", "parent_id": null }, { "id": "2711", "name": "Lead", "short_name": null, "position": 1, "type_id": "employee_follow_up", "type_name": null, "parent_id": null }, { "id": "2668", "name": "Meeting scheduled", "short_name": null, "position": 4, "type_id": "employee_follow_up", "type_name": "employee_follow_up", "parent_id": null }, { "id": "2667", "name": "Proposal sent", "short_name": null, "position": 3, "type_id": "employee_follow_up", "type_name": "employee_follow_up", "parent_id": null }]