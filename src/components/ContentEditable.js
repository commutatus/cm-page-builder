import React from 'react'
import classNames from 'classnames';
import sanitizeHtml from 'sanitize-html'
import { connect } from 'react-redux';
import {
  setCurrentElem,
  removeCurrentElem
} from '../redux/reducers/currentElemReducer'
import { PermissionContext } from '../contexts/permission-context';
import {
  addNewComponent
} from '../redux/reducers/appDataReducers'
import {setCursorToEnd} from '../utils/helpers'
import { throws } from 'assert';

class ContentEditable extends React.Component{
  
  constructor(props) {
    super(props)
    this.state = {}
    ContentEditable.contextType = PermissionContext
  }

  componentDidMount(){
    this.handleFocusAndBlur()
  }

  componentDidUpdate(oldProps, oldState){
    this.handleFocusAndBlur(oldProps, oldState)
  }
    
  handleFocusAndBlur = (oldProps, oldState) => {
    if(this.props.currentElem.elemId === this.props.id){
      if(this.elem)
        this.elem.focus()
    }
    else if(oldProps && this.props.currentElem.elemId === oldProps.currentElem.elemId){
      if(this.elem)
        this.elem.blur()
    }
  }

  emitChange = (e) => {
    if (!this.props.componentType && e.target.innerHTML) {
      this.context.emitUpdate(null, { content: e.target.innerHTML }, 'updateTitle')
    }                   // Block to make changes to title of the page
  }

  handleFocus = (e) => {
    e.persist()
    if(!this.props.componentType)
      setCursorToEnd(e)
  }

  handleNewLine = (e) => {
    if(e.key === 'Enter' && this.props.id === `page-title`) {
      e.preventDefault()
      this.emitChange(e)
    }
  }

  handleMouseDown = (e) => {
    if(this.props.id === 'page-title'){
      this.props.setCurrentElem(this.props.id)
    }
  }

  render() {
    const { placeholder, className, styles, listOrder, content } = this.props
    const {context, status} = this
    const isEdit = status === 'Edit'
    const actions = {
      onMouseUp: this.handleMouseUp,
      onBlur: this.emitChange,
      onSelect: context.handleSelection,
      onFocus: this.handleFocus,
      onMouseDown: this.handleMouseDown,
      onKeyDown: this.handleNewLine,
      onMouseDown: this.handleMouseDown
    }
    return(
      <div className={classNames("component-section", context.status.toLowerCase())}>
        {listOrder}
        <div
          data-root="true"
          ref={node => this.elem = node}
          className={classNames(className, context.status.toLowerCase())}
          styles={styles}
          contentEditable={context.status === 'Edit'}
          placeholder={content || context.status === 'Edit' ? placeholder : ''}
          dangerouslySetInnerHTML={{__html: sanitizeHtml(content || '')}}
          data-gramm_editor="false"
          {...actions}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentElem: state.currentElem
})

const mapDispatchToProps = {
  setCurrentElem,
  removeCurrentElem,
  addNewComponent,
}
export default connect(mapStateToProps, mapDispatchToProps)(ContentEditable)