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

	_getPageComponent = (type, index) => {
		let Component = require(`../components/${type}`)[type]
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
						<div class="current-user-detail"></div>
						<div class="date-updated"></div>
					</div>
				</div>
			</div>
		)
	}
}

export default PageContainer