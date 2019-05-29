import React from 'react'
import '../styles/page.css'
import { Dropdown } from '../components/Dropdown';
import { EmojiIconContainer } from '../components/EmojiIconContainer';
import { Title } from '../components/Title'
import { AddComponent } from '../components/AddComponent'
import moment from 'moment'
import { Embed } from '../components/Embed';
import { Upload } from '../components/Upload';

const dummy = [{ "id": "2670", "name": "Contract signed", "short_name": null, "position": 5, "type_id": "employee_follow_up", "type_name": "employee_follow_up", "parent_id": null }, { "id": "2666", "name": "First Contact", "short_name": null, "position": 2, "type_id": "employee_follow_up", "type_name": "employee_follow_up", "parent_id": null }, { "id": "2671", "name": "Follow up", "short_name": null, "position": 6, "type_id": "employee_follow_up", "type_name": "employee_follow_up", "parent_id": null }, { "id": "2711", "name": "Lead", "short_name": null, "position": 1, "type_id": "employee_follow_up", "type_name": null, "parent_id": null }, { "id": "2668", "name": "Meeting scheduled", "short_name": null, "position": 4, "type_id": "employee_follow_up", "type_name": "employee_follow_up", "parent_id": null }, { "id": "2667", "name": "Proposal sent", "short_name": null, "position": 3, "type_id": "employee_follow_up", "type_name": "employee_follow_up", "parent_id": null }]

class PageContainer extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			pageComponents: props.pageComponents,
			meta: props.meta
		}
	}

	componentWillMount(){
		// window.addEventListener('keypress', this.handleKeyPress)
	}

	handleKeyPress = (e) => {
		let referenceNode = document.activeElement
		if(e.key === 'Enter' && referenceNode){
			referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
		}
	}

	emitUpdate = (data, type, id) => {
		this.props.handleUpdate(data, type, id)
	}

	getPageComponent = (data, index) => {
		let typeName = this.props.typeMapping[data.component_type]
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
			<div className="page-root-container">
				<div className="page-container">
					{
						meta &&
						<React.Fragment>
							<EmojiIconContainer />
							<Title content={meta.title} handleUpdate={this.emitUpdate} />
							<div className="page-info">
								<Dropdown options={dummy} handleOptionSelect={this.handleSelect} />
								<div className="seprator-dot"></div>
								<div className="current-user-detail">
									<img src={meta.creator.profile_photo} />
									<p className="user-name">{meta.creator.full_name}</p>
								</div>
								<div className="seprator-dot"></div>
								<div className="date-updated">{moment(meta.created_at).format('DD MMM, YYYY')}</div>
							</div>
						</React.Fragment>
					}
					{/* { 
						pageComponents.map((component, index) => this.getPageComponent(component, index))
					} */}
					<Embed />
					<Upload />
					<AddComponent></AddComponent>
				</div>
			</div>
		)
	}
}

export default PageContainer