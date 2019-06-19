import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames';
import { PermissionContext } from '../contexts/permission-context';
import sanitizeHtml from 'sanitize-html'
import DragHandle from './DragHandle'
import { connect } from 'react-redux';
import {
  setCurrentElem,
  removeCurrentElem
} from '../redux/reducers/currentElemReducer'

class ContentEditable extends React.Component{


  // shouldComponentUpdate(nextProps, nextState){
  //   return (nextProps.html !== (this.elem && this.elem.innerHTML) )
  // }

  handleKeyPress = (e, handleAction, changeComponent) => {
    switch(e.key){
      case 'Enter':
        // e.preventDefault()
        // addNewComponent
        // this.emitChange()
        // setTimeout(() => {
        //   if (this.props.orderedList || this.props.unorderedList) {
        //     if (!this.elem && !this.elem.innerHTML)
        //       changeComponent(e, 'Text', this.props.id)
        //     else
        //       handleAction(this.props.orderedList ? 'olist' : 'ulist', this.props.id, this.elem)
        //   }
        //   else
        //     handleAction('add-component', this.props.id, this.elem)
        // })
        break
      default:
    }
  }


  emitChange = (e) => {
    // if(this.props.orderedList){
    //   e.target.parentElement.parentElement.className = "list-span-focus"
    // }
    // var html = this.elem.innerHTML
    // if (this.props.onChange) {
    //   this.props.onChange({
    //     target: {
    //       value: html
    //     }
    //   });
    // }
    this.props.removeCurrentElem()
  }

  // onInputChange = (e) => {
  //   var html = this.elem.innerHTML
  //   if (this.props.onInputChange) {
  //     this.props.onInputChange(html);
  //     // this.emitChange(e)
  //   }
  // }


  handleFocus = (e) => {
    e.persist()
    this.props.setCurrentElem(e.target.dataset.id)
    // if(this.props.orderedList){
    //   e.target.parentElement.parentElement.className = "list-span-focus"
    // }
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
                data-block-id={this.props.id}
                data-root="true"
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
                onMouseUp={handleMouseUp}
                data-gramm_editor="false"
              />
          </div>
        }
      </PermissionContext.Consumer>
    )
  }
}

const mapStateToProps = (state) => ({
  currentElem: state.currentElem
})

const mapDispatchToProps = {
  setCurrentElem,
  removeCurrentElem
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentEditable)