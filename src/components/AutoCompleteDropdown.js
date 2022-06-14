import React from 'react'
import styles from "./../styles/components/Dropdown.module.css"
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
import { CSSTransition } from 'react-transition-group';

export class AutoCompleteDropdown extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      options: [],
      isDropdownOpen: false,
      cmSearchInput: props.value || ''
    }
  }

  toggleDropdown = (_e) => {
    this.setState(state => ({ isDropdownOpen: !state.isDropdownOpen }), () => {
      if (this.state.isDropdownOpen)
        window.addEventListener('click', this.handleOutsideClick)
      else
        window.removeEventListener('click', this.handleOutsideClick)
    })
  }

  handleOutsideClick = (e) => {
    if (this.elem && !this.elem.contains(e.target)) {
      this.toggleDropdown()
    }
  }

  handleClick = (selectedOption) => {
    this.toggleDropdown()
    this.setState({ selectedOption })
  }


  handleChange = (e) => {
    this.props.requestHandler.fetchAutoComplete(e.target.value)
      .then(options => this.setState({ options }))
    this.setState({ [e.target.dataset.id]: e.target.value })
  }

  render() {
    const { options, selectedOption, isDropdownOpen, cmSearchInput } = this.state
    return (
      <div className={cx("dropdown-wrapper")} ref={(node) => this.elem = node}>
        <CSSTransition
          in={isDropdownOpen}
          timeout={300}
          classNames="cm-p-builder-dropdown-fade"
        >
          <div>
            <div className={cx({
              'dropdown-input': isDropdownOpen,
              'dropdown-value': !isDropdownOpen,
            })} onClick={this.toggleDropdown}>
              {
                isDropdownOpen ?
                  <input
                    onChange={this.handleChange}
                    onClick={(e) => e.stopPropagation()}
                    data-id="cmSearchInput"
                    value={cmSearchInput}
                    placeholder='Office'
                    autoFocus
                  />
                  :
                  selectedOption && selectedOption.name
              }
            </div>
            {
              isDropdownOpen &&
              <div className={cx("dropdown-list-body")}>
                {
                  options
                    .map((option, i) =>
                      <div key={`dropdown-${option.id || i}`} className={cx("dropdown-item")} onClick={() => this.handleClick(option)}>{option.name}</div>
                    )
                }
              </div>
            }
          </div>
        </CSSTransition>
      </div>
    )
  }
}
