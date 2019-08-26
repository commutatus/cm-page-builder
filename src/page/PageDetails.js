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
	pageCategories,
	currentOffices,
	isEditMode,
	showTitle,
	showEmoji,
	showPageInfo,
	useDirectStorageUpload
}) => {

	return(
		<div className="page-root-container">
			<div className="page-container" data-container-block="true">
				{
					showEmoji &&
					<EmojiIconContainer
						handleUpdate={emitUpdate}
						emoji={meta && meta.emoji}
					/>
				}
				{
					showTitle &&
					<Title
						content={meta ? meta.title : ''}
						onMouseUp={onMouseUp}
					/>
				}
				{
					showPageInfo &&
					<div className="page-info">
						{
							pageCategories &&
							<Dropdown
								handleOptionSelect={emitUpdate}
								selectedOption={meta && meta.category}
								options={pageCategories}
								type="meta"
								component_type="category_id"
							/>
						}
						<div className="seprator-dot"></div>
						{
							currentOffices &&
							<Dropdown
								handleOptionSelect={emitUpdate}
								selectedOption={meta && meta.office}
								options={currentOffices}
								type="meta"
								component_type={'office_id'}
							/>
						}
						{
						 !isEditMode &&
						 <React.Fragment>
							<div className="seprator-dot"></div>
							<div className="current-user-detail">
								<img src={meta ? meta.creator.profile_photo : ''} />
								<p className="user-name">{meta ? meta.creator.full_name : ''}</p>
							</div>
							<div className="seprator-dot"></div>
							<div className="date-updated">{meta ? moment(meta.created_at).format('DD MMM, YYYY') : ''}</div>
						 </React.Fragment>
						}
					</div>
				}


				<div className="component-list" id="component-list" onMouseUp={onMouseUp} onKeyDown={onKeyDown}>
				{
					pageComponents && pageComponents.map((component, index) => getPageComponent(component, index))
				}
				</div>
			</div>
		</div>
	)
}
