import React from 'react'
import classNames from 'classnames';
import sanitizeHtml from 'sanitize-html'
import { connect } from 'react-redux';
import {
  setCurrentElem,
} from '../redux/reducers/currentElemReducer'
import { PermissionContext } from '../contexts/permission-context';
import {
  addNewComponent
} from '../redux/reducers/appDataReducers'

class ContentEditable extends React.Component{
  
  constructor(props) {
    super(props)
    this.state = {}
    ContentEditable.contextType = PermissionContext
  }

  componentDidMount(){
    this.setFocus()
  }

  componentDidUpdate(){
    this.setFocus()
  }
    
  setFocus = () => {
    if(this.props.currentElem.elemId === this.props.id){
      setTimeout(() => {
        if(this.elem)
          this.elem.focus()
      }, 0)
    }
  }

  emitChange = (e, context) => {
    if (!this.props.componentType && e.target.innerHTML) {
      context.emitUpdate(null, { content: e.target.innerHTML }, 'updateTitle')
    }                   // Block to make changes to title of the page
  }

  render() {
    const { placeholder, className, styles, handleMouseUp, listOrder, content } = this.props
    const {context} = this
    return(
      <div className={classNames("component-section", context.status.toLowerCase())}>
        {listOrder}
        <div
          data-root="true"
          ref={node => this.elem = node}
          className={classNames(className, context.status.toLowerCase())}
          onBlur={(e) => this.emitChange(e, context)}
          contentEditable={context.status === 'Edit'}
          placeholder={content || context.status === 'Edit' ? placeholder : ''}
          dangerouslySetInnerHTML={{__html: sanitizeHtml(content || '')}}
          styles={styles}
          //onMouseUp={handleMouseUp}
          data-gramm_editor="false"
          onSelect={context.handleSelection}
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
  addNewComponent
}
export default connect(mapStateToProps, mapDispatchToProps)(ContentEditable)