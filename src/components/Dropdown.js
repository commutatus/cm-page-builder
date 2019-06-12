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

  toggleDropdown = () => {
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
    this.setState({selectedOption})
    this.toggleDropdown()
    this.props.handleOptionSelect(selectedOption, null, 'categories')
  }

  handleChange = (e) => {
    this.setState({[e.target.dataset.id]: e.target.value})
  }

  render(){
    const {options, selectedOption, isDropdownOpen, cmSearchInput} = this.state
    console.log(this.state)
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
                          <span><i className="cm-hashtag" /></span>
                          {(selectedOption && selectedOption.name) || ''}
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
                              <div key={`dropdown-${option.id || i}`} className="dropdown-item" onClick={() => this.handleClick(option)}>{option.name}</div>
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