import moment from 'moment';
import React from 'react';
import { Dropdown } from '../components/Dropdown';
import { EmojiIconContainer } from '../components/EmojiIconContainer';
import MultiSelectDropdown from '../components/MultiSelectDropdown';
import { Title } from '../components/Title';
import {
	REMOVE_CURRENT_ELEM
} from '../redux/reducers/currentElemReducer';
import { store } from '../redux/store';

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
	const [components, setComponents] = React.useState([]);

	React.useEffect(() => {
		const updatedComponents = [];
		if (pageComponents && pageComponents.length > 0) {
			let counter = 0;
			const length = pageComponents.length;
			pageComponents.map((pageComponent, index) => {
				getPageComponent(pageComponent, index).then((component) => {
					updatedComponents.push(component);
					counter++;
					if (counter === length) {
						setComponents(updatedComponents);
					}
				}).catch((err) => {
					console.log(err);
					counter++;
					if (counter === length) {
						setComponents(updatedComponents);
					}
				})
			});
		}
	}, [pageComponents])

	return (
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
							<MultiSelectDropdown
								handleOptionSelect={emitUpdate}
								selectedOptions={meta && meta.categories}
								options={pageCategories}
								type="meta"
								component_type="categories"
							/>
						}
						<div className="seprator-dot"></div>
						<div className='hub-detail-wrapper'>
							{
								currentOffices &&
								<Dropdown
									handleOptionSelect={emitUpdate}
									selectedOption={meta && meta.office}
									options={currentOffices}
									type="meta"
									component_type={'office_id'}
									onClick={() => store.dispatch({ type: REMOVE_CURRENT_ELEM })}
								/>
							}
							{
								meta && meta.creator &&
								<React.Fragment>
									<div className="seprator-dot"></div>
									<div className="current-user-detail">
										<img src={meta.creator && meta.creator.profile_photo} />
										<p className="user-name">{meta.creator.full_name}</p>
									</div>
								</React.Fragment>
							}
							{
								!isEditMode &&
								<React.Fragment>
									<div className="seprator-dot"></div>
									<div className="date-updated">{meta ? moment(meta.created_at).format('DD MMM, YYYY') : ''}</div>
								</React.Fragment>
							}
						</div>
					</div>
				}


				<div className="component-list" id="component-list" onMouseUp={onMouseUp} onKeyDown={onKeyDown}>
					{
						components && components.map((component) => {
							return component;
						})

					}
				</div>
			</div>
		</div>
	)
}
