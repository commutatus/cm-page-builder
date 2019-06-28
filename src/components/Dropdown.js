import React from 'react'
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import '../styles/components/Dropdown.css';
import { PermissionContext } from '../contexts/permission-context';

export class Dropdown extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      options: props.options,
      selectedOption: props.selectedOption,
      isDropdownOpen: false,
      cmSearchInput: props.value || ''
    }
  }

  toggleDropdown = (e) => {
    e.stopPropagation()
    this.setState(state => ({isDropdownOpen: !state.isDropdownOpen}), () => {
      if(this.state.isDropdownOpen)
        window.addEventListener('click', this.handleOutsideClick)
      else
        window.removeEventListener('click', this.handleOutsideClick)
    })
  }

  handleOutsideClick = (e) => {
    if(this.elem && !this.elem.contains(e.target)){
      this.toggleDropdown(e)
    }
  }

  handleClick = (e, selectedOption) => {
    this.setState({selectedOption})
    this.toggleDropdown(e)
    this.props.handleOptionSelect(null, selectedOption, this.props.type, this.props.component_type)
  }

  handleChange = (e) => {
    this.setState({[e.target.dataset.id]: e.target.value})
  }

  render(){
    const {options, selectedOption, isDropdownOpen, cmSearchInput} = this.state
    // console.log(this.state)
    return(
      <PermissionContext.Consumer>
        {
          value => {
            return(
              <div className="dropdown-wrapper" ref={(node) => this.elem = node}>
                <CSSTransition
                  in={isDropdownOpen}
                  timeout={300}
                  classNames="dropdown-fade"
                >
                  <div>
                    <div 
                      className={isDropdownOpen ? 'dropdown-input' : 'dropdown-value' }  
                      onClick={value.status === 'Edit' ? this.toggleDropdown : undefined}
                    > 
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
                        <div className={value.status === 'Edit' ? 'value-text-edit' : 'value-text-read'}>
                          <span><i className={this.props.component_type === 'category_id' ? 'cm-hashtag' : 'cm-hub'} /></span>
                          {
                            (selectedOption && selectedOption.name) || 
                            (
                              value.status === 'Edit' &&
                              (this.props.component_type === 'category_id'  ? "Select Categories" : "Select Office")
                            )
                          }
                        </div>
                      }
                    </div>  
                    {
                      isDropdownOpen && 
                      <div className="dropdown-list-body">
                        {
                          options
                            .filter(option => !cmSearchInput || (option.name.toLowerCase().includes(cmSearchInput.toLowerCase())))
                            .map((option, i) => 
                              <div key={`dropdown-${option.id || i}`} className="dropdown-item" onClick={(e) => this.handleClick(e,option)}>{option.name}</div>
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
      </PermissionContext.Consumer>
    )
  }
}

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedOption: PropTypes.object,
  handleOptionSelect: PropTypes.func.isRequired
}