import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames';
import sanitizeHtml from 'sanitize-html'
import DragHandle from './DragHandle'
import { connect } from 'react-redux';
import {
  setCurrentElem,
  removeCurrentElem
} from '../redux/reducers/currentElemReducer'
import { PermissionContext } from '../contexts/permission-context';
import {
  updateComponent, 
  addNewComponent
} from '../redux/reducers/appDataReducers'

class ContentEditable extends React.Component{

  emitChange = (e, context) => {
    this.props.updateComponent({id: this.props.id, newState: {content: e.target.innerHTML, initial: false}})
    if (!this.props.componentType && e.target.innerHTML) {
      context.emitUpdate(null, { content: e.target.innerHTML }, 'updateTitle')
      this.props.addNewComponent({ componentType: 'Text', initial: true })	
    }                   // Block to make changes to title of the page
    else {
      if (this.props.initial)  {
        context.emitUpdate(null, { content: e.target.innerHTML, position: this.props.position, component_type: this.props.componentType, client_reference_id: this.props.id }, 'createComponent')
      }         // Block to create component when a blank component is added
      else if (e.target.innerHTML)      //Block to update component when changes in content is made
        context.emitUpdate(this.props.id, { content: e.target.innerHTML, position: this.props.position, component_type: this.props.componentType }, 'updateComponent')
      // else 
    }
   // this.props.removeCurrentElem()
  }

  render() {
    const { placeholder, className, styles, handleMouseUp, listOrder, content } = this.props
    return(
      <PermissionContext.Consumer>
        {
          (value) => 
            <div className={classNames("component-section", value.status.toLowerCase())}>
              {listOrder}
              <div
                data-root="true"
                ref={node => this.elem = node}
                className={classNames(className, value.status.toLowerCase())}
                onBlur={(e) => this.emitChange(e, value)}
                contentEditable={value.status === 'Edit'}
                placeholder={content || value.status === 'Edit' ? placeholder : ''}
                dangerouslySetInnerHTML={{__html: sanitizeHtml(content || '')}}
                styles={styles}
                //onMouseUp={handleMouseUp}
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
  removeCurrentElem,
  updateComponent,
  addNewComponent
}
export default connect(mapStateToProps, mapDispatchToProps)(ContentEditable)