import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames';
import { PermissionContext } from '../contexts/permission-context';
import sanitizeHtml from 'sanitize-html'

export default class ContentEditable extends React.Component{

  constructor(props){
    super(props)
    this.state = {}
  }

  shouldComponentUpdate(nextProps){
    return nextProps.html !== (this.elem && this.elem.innerHTML)
  }

  handleFocus = () => {
    if(this.elem){
      // debugger
      // let range = document.createRange()
      // let len = this.elem.innerText.length
      // range.setStart(this.elem, len)
    } 
  }

  handleKeyPress = (e, handleAction) => {
    switch(e.key){
      case 'Enter':
        e.preventDefault()
        handleAction('add-component', this.props.id, this.elem)
        break
      default:
    }
  }

  handleKeyDown = (e, handleAction) => {
    if(e.key === 'Backspace'){
      if(!this.elem.innerHTML){
        console.log(e.target.dataset)
        let prevChild = (this.elem.parentNode.previousSibling && this.elem.parentNode.previousSibling.firstChild) || this.elem.parentNode.parentNode.previousSibling.firstChild.firstChild
        prevChild.focus()
        handleAction('remove-component', this.props.id, this.elem)
      }
    }
  }

  getClassName = (name) => {
    return {
      'Read': 'reading-mode',
      'Edit': 'edit-mode'
    }
  }

  emitChange = () => {
    var html = this.elem.innerHTML
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
        target: {
          value: html
        }
      });
    }
    this.lastHtml = html;
  }

  onInputChange = () => {
    var html = this.elem.innerHTML
    if (this.props.onInputChange) {
      this.props.onInputChange(html);
    }
  }

  render() {
    const { placeholder, className, styles, handleMouseUp } = this.props
    return(
      <PermissionContext.Consumer>
        {
          (value) => 
            <div style={{width:'100%'}}>
              <div
                data-id={this.props.id}
                ref={node => this.elem = node}
                className={classNames(className, value.status.toLowerCase())}
                onInput={this.onInputChange}
                onBlur={this.emitChange}
                onFocus={this.handleFocus}
                contentEditable={value.status === 'Edit'}
                placeholder={placeholder}
                dangerouslySetInnerHTML={{__html: sanitizeHtml(this.props.html || '')}}
                styles={styles}
                onKeyPress={(e) => this.handleKeyPress(e, value.handleAction)}
                onKeyDown={(e) => this.handleKeyDown(e, value.handleAction)}
                onMouseUp={handleMouseUp}
              />
          </div>
        }
      </PermissionContext.Consumer>
    )
  }
}