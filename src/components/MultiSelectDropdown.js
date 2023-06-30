import React from 'react'
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { PermissionContext } from '../contexts/permission-context';
import { formatOptionsToMultiSelect } from '../utils/helpers';
import { connect } from 'react-redux';
import { removeCurrentElem } from '../redux/reducers/currentElemReducer'
import styles from "./../styles/components/MultiSelectDropdown.module.css"
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

class MultiSelectDropdown extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			options: formatOptionsToMultiSelect(props.options, props.selectedOptions),
			isDropdownOpen: false,
			cmSearchInput: props.value || '',
		}
	}

	toggleDropdown = (e) => {
		this.props.removeCurrentElem()
		e.stopPropagation()
		this.setState(state => ({ isDropdownOpen: !state.isDropdownOpen }), () => {
			if (this.state.isDropdownOpen)
				window.addEventListener('click', this.handleOutsideClick)
			else
				window.removeEventListener('click', this.handleOutsideClick)
		})
	}

	handleOutsideClick = (e) => {
		if (this.elem && !this.elem.contains(e.target)) {
			this.toggleDropdown(e)
		}
	}

	handleClick = (e, index) => {
		if (this.elem && this.elem.contains(e.target))
			e.stopPropagation()
		let { options } = this.state
		let optionsArray = JSON.parse(JSON.stringify(options))
		if (optionsArray) {
			optionsArray[index].isSelected = !optionsArray[index].isSelected
			let formattedOptions = optionsArray.reduce((a, i) => (i.isSelected && a.push(i.option), a), [])
			this.props.handleOptionSelect(null, formattedOptions, this.props.type, this.props.component_type)
			if (formattedOptions.length <= 3)
				this.setState({ options: optionsArray })
		}
	}

	handleChange = (e) => {
		this.setState({ [e.target.dataset.id]: e.target.value })
	}

	render() {
		const { options, isDropdownOpen, cmSearchInput } = this.state
		let selectedOptions = options && options.filter(item => item.isSelected)
		return (
			<PermissionContext.Consumer>
				{
					value => {
						return (
							<div className={cx("multi-select-dropdown-container")} ref={(node) => this.elem = node}>
								<CSSTransition
									in={isDropdownOpen}
									timeout={300}
									classNames="cm-p-builder-dropdown-fade"
								>
									<div>
										<div
											className={cx("dropdown-value")}
											onClick={value.status === 'Edit' ? this.toggleDropdown : undefined}
										>
											{
												selectedOptions && selectedOptions.length ? selectedOptions.map((item) => {
													return (
														<div className={cx({
															'value-text-edit': value.status === 'Edit',
															'value-text-read': value.status !== 'Edit',
														})}>
															<span><i className={cx("fa-light fa-hashtag")} /></span>
															{item.option && item.option.name}
														</div>
													)
												})
													:
													<div className={cx({
														'value-text-edit': value.status === 'Edit',
														'value-text-read': value.status !== 'Edit',
													})}>
														{value.status === 'Edit' ? "Select Categories" : ''}
													</div>
											}
											{
												isDropdownOpen &&
												<div className={cx("multi-select-dropdown-wrapper")}>
													<div className={cx("multi-select-search-input-wrapper")}>
														<input
															onChange={this.handleChange}
															onClick={(e) => e.stopPropagation()}
															data-id="cmSearchInput"
															value={cmSearchInput}
															className={cx("multi-select-dropdown-search")}
															autoFocus
															placeholder='Search categories'
														/>
														{!cmSearchInput && <span className={cx("search-icon")}>
															<i className="fa-regular fa-magnifying-glass" />
														</span>}
													</div>
													<div className={cx("multi-select-dropdown-list-body")}>
														{
															options
																.map((option, i) => {
																	if (!cmSearchInput || (option.option.name.toLowerCase().includes(cmSearchInput.toLowerCase())))
																		return (
																			<div key={`dropdown-${option.option.id || i}`} className={cx("dropdown-item")} onClick={(e) => this.handleClick(e, i)}>
																				<input checked={option.isSelected} type='checkbox' className={cx("dropdown-item-checkbox")} />
																				{option.option.name}
																			</div>
																		)
																})
														}
													</div>
												</div>
											}
										</div>
									</div>
								</CSSTransition>
							</div>
						)
					}
				}
			</PermissionContext.Consumer>
		)
	}
}

MultiSelectDropdown.propTypes = {
	options: PropTypes.arrayOf(PropTypes.object).isRequired,
	handleOptionSelect: PropTypes.func.isRequired
}

const mapDispatchToProps = {
	removeCurrentElem
}

export default connect(null, mapDispatchToProps)(MultiSelectDropdown)
