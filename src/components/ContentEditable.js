import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames';
import { PermissionContext } from '../contexts/permission-context';
import sanitizeHtml from 'sanitize-html'
import DragHandle from './DragHandle'

export default class ContentEditable extends React.Component{


  shouldComponentUpdate(nextProps, nextState){
    return (nextProps.html !== (this.elem && this.elem.innerHTML) )
  }

  handleKeyPress = (e, handleAction, changeComponent) => {
    switch(e.key){
      case 'Enter':
        e.preventDefault()
        e.target.blur()
        setTimeout(() => {
          if (this.props.orderedList || this.props.unorderedList) {
            if (!this.elem && !this.elem.innerHTML)
              changeComponent(e, 'Text', this.props.id)
            else
              handleAction(this.props.orderedList ? 'olist' : 'ulist', this.props.id, this.elem)
          }
          else
            handleAction('add-component', this.props.id, this.elem)
        })
        break
      default:
    }
  }

  handleKeyDown = (e, handleAction) => {
    // if(e.key === 'Backspace'){
    //   if(!this.elem.innerHTML){
    //     let prevChild = null
    //     if(this.elem.parentNode.previousSibling){
    //       if(this.elem.parentNode.previousSibling.nodeName === 'SPAN'){
    //         prevChild = this.elem.parentNode.parentNode.previousSibling.childNodes[1].childNodes[1]
    //       }else{
    //         prevChild = this.elem.parentNode.previousSibling.firstChild[1]
    //       }
    //     }else{
    //       prevChild = this.elem.parentNode.parentNode.previousSibling.firstChild.firstChild[1]
    //     }
    //     prevChild.focus()
    //     handleAction('remove-component', this.props.id, this.elem)
    //   }
    // }
  }

  emitChange = (e) => {
    if(this.props.orderedList){
      e.target.parentElement.parentElement.className = "list-span-focus"
    }
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

  onInputChange = (e) => {
    var html = this.elem.innerHTML
    if (this.props.onInputChange) {
      this.props.onInputChange(html);
      // this.emitChange(e)
    }
  }


  handleFocus = (e) => {
    if(this.props.orderedList){
      e.target.parentElement.parentElement.className = "list-span-focus"
    }
  }
  
  render() {
    const { placeholder, className, styles, handleMouseUp, listOrder, html } = this.props
    return(
      <PermissionContext.Consumer>
        {
          (value) => 
            <div className="component-section">
              {listOrder}
              {
                className !== 'cm-title' && value.status === 'Edit' &&
                <DragHandle handleAction={value.handleAction} id={this.props.id}/>
              }
              <div
                data-id={this.props.id}
                ref={node => this.elem = node}
                className={classNames(className, value.status.toLowerCase())}
                onInput={this.onInputChange}
                onBlur={this.emitChange}
                onFocus={this.handleFocus}
                contentEditable={value.status === 'Edit'}
                placeholder={html || value.status === 'Edit' ? placeholder : ''}
                dangerouslySetInnerHTML={{__html: sanitizeHtml(html || '')}}
                styles={styles}
                onKeyPress={(e) => this.handleKeyPress(e, value.handleAction, value.editComponent)}
                onKeyDown={(e) => this.handleKeyDown(e, value.handleAction)}
                onMouseUp={handleMouseUp}
                data-gramm_editor="false"
              />
          </div>
        }
      </PermissionContext.Consumer>
    )
  }
}