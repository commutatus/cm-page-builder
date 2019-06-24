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
import {
  updateComponent
} from '../redux/reducers/appDataReducers'

class ContentEditable extends React.Component{

  emitChange = (e) => {
    this.props.updateComponent({id: this.props.id, newState: {content: e.target.innerHTML}})
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
                onInput={this.onInputChange}
                onBlur={this.emitChange}
                contentEditable={value.status === 'Edit'}
                placeholder={content || value.status === 'Edit' ? placeholder : ''}
                dangerouslySetInnerHTML={{__html: sanitizeHtml(content || '')}}
                styles={styles}
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
  removeCurrentElem,
  updateComponent
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentEditable)