import React from 'react'
import PropTypes from 'prop-types';
import '../styles/components/Dropdown.css';
import { debounce } from 'throttle-debounce';

export class AutoCompleteDropdown extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      options: [],
      isDropdownOpen: false,
      cmSearchInput: props.value || ''
    }
  }

  toggleDropdown = (e) => {
    this.setState(state => ({isDropdownOpen: !state.isDropdownOpen}), () => {
      if(this.state.isDropdownOpen)
        window.addEventListener('click', this.handleOutsideClick)
      else
        window.removeEventListener('click', this.handleOutsideClick)
    })
  }

  handleOutsideClick = (e) => {
    if(this.elem && !this.elem.contains(e.target)){
      this.toggleDropdown()
    }
  }

  handleClick = (selectedOption) => {
    this.toggleDropdown()
    this.setState({selectedOption})
    // this.props.handleOptionSelect(selectedOption)
  }


  handleChange = (e) => {
    this.props.requestHandler.fetchAutoComplete(e.target.value)
      .then(options => this.setState({options}))
    this.setState({[e.target.dataset.id]: e.target.value})
  }

  render(){
    const {options, selectedOption, isDropdownOpen, cmSearchInput} = this.state
    return(
      <div className="dropdown-container" ref={(node) => this.elem = node}>
        <div className={isDropdownOpen ? '' : 'dropdown-value' }  onClick={this.toggleDropdown}>
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
          <div className="dropdown-body">
            {
              options
                .map((option, i) => 
                  <div key={`dropdown-${option.id || i}`} className="dropdown-item" onClick={() => this.handleClick(option)}>{option.name}</div>
                )
            }
          </div>
        }
      </div>
    )
  }
}
