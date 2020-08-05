import classNames from 'classnames'
import React from 'react'
import '../styles/Select.css'

class SelectNew extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      showDropdown: props.openByDefault,
      searchText: '',
      currentPosition: -1,
      initialValue: ''
    }
  }
  
  componentWillMount(){
    this.handleValue(this.props.children, this.props.value)
  }

  componentDidMount(){
    if(this.props.autoFocus) {
      this.inputNode && this.inputNode.focus()
    }
  }

  componentWillReceiveProps(nextProps){
    this.handleValue(nextProps.children, nextProps.value)
  }

  handleOutsideClick = (e) => {
    if(this.node && !this.node.contains(e.target)){
      this.setState({showDropdown: false})
    }
  }

  handleValue(child, value){
    let {showSearch} = this.props
    if(!showSearch){
      let initialValue = ""
      React.Children.forEach(child, (child => value && child.props.value === value ? initialValue = child.props.children : undefined))
      this.setState({initialValue})
    }
  }

  handleNavigation = (e) => {
    let {currentPosition} = this.state
    let {
      filterOption,
      filterOptionProp = 'value',
      showSearch,
    } = this.props

    let {
      searchText,
    } = this.state

    if(this.scrollableDiv){
      let children = this.scrollableDiv.querySelectorAll('div')
      let childCount = children.length
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          if(childCount > 0 && currentPosition > 0){
            let el = children[currentPosition - 1]
            this.scrollableDiv.scrollTo(0, el.offsetTop - el.offsetHeight - 5)
            this.setState({currentPosition: currentPosition - 1})
          }
          break;
        case 'ArrowDown':
          e.preventDefault()
          if(childCount > 0 && (currentPosition < childCount - 1)){
            let el = children[currentPosition + 1]
            this.scrollableDiv.scrollTo(0, el.offsetTop - el.offsetHeight - 5)
            this.setState({currentPosition: currentPosition + 1})
          }
          break
        case 'Enter':
          e.preventDefault()
          let counter = -1
          React.Children.forEach(this.props.children, (child, ) => {
            if(
              filterOption
              ?
              filterOption && filterOption(searchText, child)
              :
              showSearch &&
              filterOptionProp && 
              child.props[filterOptionProp] && 
              String(!child.props[filterOptionProp]).toLowerCase().includes(searchText.toLowerCase())
            ) {
              return 
            }
            counter++
            if(counter === Number(currentPosition)){
              this.handleSelect(child.props.dataProp || child.props.value, e)
            }
          })
          break;
        case 'Tab':
          this.toggleDropdown()
          break;
        default:
          break;
      }
    }
  }

  handleChange = (e) => {
    this.setState({searchText: e.target.value, currentPosition: 0})
  }
  

  
  toggleDropdown = () => {
    this.setState(state => ({showDropdown: this.props.openUntillSelect ? true : !state.showDropdown}), () => {
      if(!this.props.shouldAlwaysOpen){
        if(this.state.showDropdown)
          document.addEventListener('click', this.handleOutsideClick, false)
        else
          document.removeEventListener('click', this.handleOutsideClick, false)
      }
    })
  }

  handleSelect = (...args) => {
    this.props.onSelect(...args)
    this.setState({searchText: ''}, () => {
      this.toggleDropdown()
    })
  } 

  handleMouseEnter = (e, currentPosition) => {
    e.preventDefault()
    this.setState({currentPosition})
  }

  handleMouseLeave = (e, currentPosition) => {
    e.preventDefault()
    this.setState({currentPosition})
  }

  getChildren = () => {
    let {
      searchText,
      currentPosition
    } = this.state

    let {
      children, 
      showCheckbox, 
      filterOption,
      filterOptionProp = 'value',
      showSearch
    } = this.props

    let childProps = {
      showCheckbox,
      handleSelect: this.handleSelect
    }

    let counter = -1
    return (
      React.Children.map(children, ((child, i) => {
        if(filterOptionProp !== 'value' && !child.props[filterOptionProp]){
          console.error(`Warning: filterOptionProp is passed but its prop is not passed in the Option ${i}. This may result inconsistency.`)
        }
        else if(
          filterOption
          ?
          filterOption && filterOption(searchText, child)
          :
          showSearch &&
          filterOptionProp && 
          child.props[filterOptionProp] && 
          !String(child.props[filterOptionProp]).toLowerCase().includes(searchText.toLowerCase())
        ) {
          return 
        }
        counter++
        return (React.cloneElement(child, {
          ...childProps, 
          handleMouseEnter: this.handleMouseEnter, 
          handleMouseLeave: this.handleMouseLeave,
          position: counter,
          currentPosition,
        }))
      }))
    )
  }

  render() {
    let {
      showDropdown, 
      searchText,
      initialValue
    } = this.state

    let {
      showSearch, 
      placeholder, 
      containerClassname,
      containerStyle,
      showArrow,
      searchInputClassname,
      showSearchIcon,
      disabled
    } = this.props

    return(
      <div 
        className={classNames('cm-select-container', containerClassname)} 
        style={containerStyle}
        onKeyDownCapture={this.handleNavigation}
        ref={node => this.node = node}
      >
        <div className="cm-select-body">
          {
            [
              React.isValidElement(initialValue) || !showSearch
              ? 
              <div
                ref={node => this.inputNode = node}
                className={classNames(
                  "search-input", 
                  searchInputClassname, 
                  {
                    "disable-search": !showSearch, 
                    "disabled-dropdown": disabled
                  }
                )}
                onFocus={!disabled ? this.toggleDropdown : () => {}}
                disabled={disabled}
                key="cm-select-input"
                {...(!disabled ? {tabIndex: "0"} : {})}
              >
                {initialValue}
              </div>
              :
              <input 
                ref={node => this.inputNode = node}
                type="text"
                className={classNames(
                  "search-input", 
                  searchInputClassname, 
                  {
                    "disable-search": !showSearch, 
                    "disabled-dropdown": disabled
                  }
                )}
                value={showSearch ? searchText : initialValue}
                onChange={this.handleChange}
                placeholder={placeholder}
                autoComplete="nope"
                onFocus={this.toggleDropdown}
                disabled={disabled}
                key="cm-select-input"
                {...(!showSearch ? {readOnly: true} : {})}
              />,
              showSearchIcon && <span key="cm-select-showSearchIcon"> <i className="cm cm-search search-icon"> </i> </span>,
              showArrow && <span key="cm-select-showArrow"> <i className={`cm-icon-cm-icon-arrow-${showDropdown ? 'up' : 'down'} arrow-icon`}> </i> </span>
            ]
          }
          {
            showDropdown &&
              <div className="cm-select-options" ref={node => this.scrollableDiv = node}>
                {this.getChildren()}
              </div>
            }
        </div>
      </div>
    )
  }

}

const Option = (props) => {
  let {
    children, 
    handleSelect, 
    showCheckbox, 
    selected, 
    dataProp, 
    currentPosition,
    position,
    handleMouseEnter,
    handleMouseLeave,
    value,
    ...rest
  } = props
  let isFocused = currentPosition === position
  return(
    <div 
      className={`cm-option-item ${ isFocused ? 'hover' : ''}`} 
      onClick={handleSelect.bind(this, dataProp || value)} 
      onMouseEnter={(e) => handleMouseEnter(e, position)}
      onMouseLeave={(e) => handleMouseLeave(e, position)}
      {...rest}
    >
      {showCheckbox && <span><input type="checkbox" checked={selected} readOnly /></span>}
      {children}
    </div>
  )
}

export default Object.assign(SelectNew, {
  Option
})

//Props that can be passed
//openUntillSelect => keep the dropdown open untill an option is selected.
// showSearch => make the dropdown searchable, 
// placeholder, 
//containerClassname
//containerStyle
//showArrow,
//searchInputClassname,
//showSearchIcon