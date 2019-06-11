import React from 'react'
import moment from 'moment'
import { EmojiIconContainer } from '../components/EmojiIconContainer';
import { Title } from '../components/Title'
import { Dropdown } from '../components/Dropdown';
import { AutoCompleteDropdown } from '../components/AutoCompleteDropdown';

export const PageDetails = ({
	meta, 
	emitUpdate, 
	pageComponents, 
	getPageComponent, 
	onMouseUp, 
	onKeyDown, 
	requestHandler,
	pageCategories
}) => 
	<div className="page-root-container">
		<div className="page-container">
			<EmojiIconContainer />
			<Title 
				content={meta ? meta.title : ''} 
				handleUpdate={emitUpdate} 
				onMouseUp={onMouseUp} 
				currentType="Title" 
			/>
			<div className="page-info">
				{
					pageCategories &&
					<Dropdown 
						handleOptionSelect={emitUpdate}
						optionSelected={pageCategories} 
						options={pageCategories} 
					/>
				}
				<div className="seprator-dot"></div>
				<AutoCompleteDropdown 
					handleOptionSelect={data => console.log(data)} 
					requestHandler={requestHandler}
					selectedOption={meta && meta.office}
				/>
				<div className="seprator-dot"></div>
				<div className="current-user-detail">
					<img src={meta ? meta.creator.profile_photo : ''} />
					<p className="user-name">{meta ? meta.creator.full_name : ''}</p>
				</div>
				<div className="seprator-dot"></div>
				<div className="date-updated">{meta ? moment(meta.created_at).format('DD MMM, YYYY') : ''}</div>
			</div>
			<div className="component-list" onMouseUp={onMouseUp} onKeyDown={onKeyDown}>
			{ 
				pageComponents.map((component, index) => getPageComponent(component, index))
			}
			</div>
		</div>
	</div>