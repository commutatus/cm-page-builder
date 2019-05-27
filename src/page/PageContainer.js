import React from 'react'
import '../styles/page.css'
import { Dropdown } from '../components/Dropdown';
import { EmojiIconContainer } from '../components/EmojiIconContainer';
import { Title } from '../components/Title'

const dummy = [{ "id": "2670", "name": "Contract signed", "short_name": null, "position": 5, "type_id": "employee_follow_up", "type_name": "employee_follow_up", "parent_id": null }, { "id": "2666", "name": "First Contact", "short_name": null, "position": 2, "type_id": "employee_follow_up", "type_name": "employee_follow_up", "parent_id": null }, { "id": "2671", "name": "Follow up", "short_name": null, "position": 6, "type_id": "employee_follow_up", "type_name": "employee_follow_up", "parent_id": null }, { "id": "2711", "name": "Lead", "short_name": null, "position": 1, "type_id": "employee_follow_up", "type_name": null, "parent_id": null }, { "id": "2668", "name": "Meeting scheduled", "short_name": null, "position": 4, "type_id": "employee_follow_up", "type_name": "employee_follow_up", "parent_id": null }, { "id": "2667", "name": "Proposal sent", "short_name": null, "position": 3, "type_id": "employee_follow_up", "type_name": "employee_follow_up", "parent_id": null }]
class PageContainer extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			pageComponents: ['Text', 'List_Num'],
			componentType: 'List'
		}
	}

	componentWillMount(){
		window.addEventListener('keypress', this.handleKeyPress)
	}

	handleKeyPress = (e) => {
		// if(e.keyNae)
	}

	_getPageComponent = (type, index) => {
		let typeName = type.split(' ').join('')
		let Component = require(`../components/${typeName}`)[typeName]
		return <Component key={`${type}-${index}`} />
	}

	handleSelect = () => {

	}

	render() {
		const { pageComponents } = this.state
		return (
			<div className="page-root-container">
				<div className="page-container">
					<EmojiIconContainer />
					<Title />
					<div className="page-info">
						<Dropdown options={dummy} handleOptionSelect={this.handleSelect} />
						<div className="seprator-dot"></div>
						<div className="current-user-detail">
							<img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlJacZ5USjBsoEelTZ1n4xmielCl906rNl2csiRBwLHSDb1N9N"} />
							<p className="user-name">Ktm Vivek</p>
						</div>
						<div className="seprator-dot"></div>
						<div className="date-updated">15 Jan, 2018</div>
					</div>
					{ 
						['Text', 'Header1', 'Header2', 'Header3', 'Add Component'].map(item => this._getPageComponent(item))
					}
				</div>
			</div>
		)
	}
}

export default PageContainer