import React from 'react'
import '../styles/page.css'
import { EmojiIconContainer } from '../components/EmojiIconContainer';
import { Title } from '../components/Title'
import moment from 'moment'
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
		</div>
	</div>
class PageContainer extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			pageComponents: props.pageComponents || [{content: '', position: 1, component_type: 'AddComponent' }],
			meta: props.meta,
		}
	}

	emitUpdate = (data, type) => {
		console.log(data)
		let {handleUpdate} = this.props
		if(handleUpdate)
			handleUpdate({data, type})
	}

	getPageComponent = (data, index) => {
		let typeName = data.component_type === 'AddComponent' ? data.component_type : this.props.typeMapping[data.component_type]
		let dataId = data.component_type !== 'AddComponent' ? data.id : `${data.component_type}-${index}`
		let Component = require(`../components/${typeName}`)[typeName]
		return (
			<Component 
				key={dataId}
				content={data.content}
				handleUpdate={this.emitUpdate}
				id={dataId}
			/>
		)
	}

	handleAction = (type, id, elem) => {
		let {pageComponents} = this.state
		let temp = [], position = 1
		switch(type){
			case 'add-component':
				
				for(let i in pageComponents){
					if(id == pageComponents[i].id){ //can compare with the id also.
						temp.push({...pageComponents[i], position})
						temp.push({content: '', position: position+1, component_type: 'AddComponent' })
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
						if(id == pageComponents[i].id){ //can compare with the id also.
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

	// handleSelect = () => {

	// }

	render() {
		const { pageComponents, meta } = this.state
		return (
			<PermissionContext.Provider value={{status: 'Read', handleAction: this.handleAction}}> 
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