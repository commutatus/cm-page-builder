import React from 'react'
import PropTypes from 'prop-types';
import '../styles/components/Dropdown.css';

export class Dropdown extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      options: props.options,
      selectedOption: props.value,
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
    if(!this.elem.contains(e.target)){
      this.toggleDropdown()
    }
  }

  handleClick = (selectedOption) => {
    this.setState({selectedOption})
    // this.props.handleOptionSelect(selectedOption)
  }

  handleChange = (e) => {
    this.setState({[e.target.dataset.id]: e.target.value})
  }

  render(){
    const {options, selectedOption, isDropdownOpen, cmSearchInput} = this.state
    return(
      <div className="dropdown-wrapper" ref={(node) => this.elem = node}>
        <div className={isDropdownOpen ? 'dropdown-input' : 'dropdown-value' }  onClick={this.toggleDropdown}>
          {
            isDropdownOpen ?
            <input 
              onChange={this.handleChange} 
              onClick={(e) => e.stopPropagation()} 
              data-id="cmSearchInput" 
              value={cmSearchInput}
              autoFocus
            />
            :
            (selectedOption && selectedOption.name) || (options && options[0].name)
          }
        </div>  
        {
          isDropdownOpen && 
          <div className="dropdown-body">
            {
              options
                .filter(option => !cmSearchInput || (option.name.toLowerCase().includes(cmSearchInput.toLowerCase())))
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

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedOption: PropTypes.object,
  handleOptionSelect: PropTypes.func.isRequired
}