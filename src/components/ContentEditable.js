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
    this.props.removeCurrentElem()
  }

  handleFocus = (e) => {
    e.persist()
    this.props.setCurrentElem(this.props.id)
  }

  // Method to position the cursor at the end of the content
  setCursorToEnd = (elem, pos) => {
    if(elem.setSelectionRange) {
      elem.setSelectionRange(pos,pos);
    }
    else if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }

  render() {
    const { placeholder, className, styles, handleMouseUp, listOrder, content } = this.props
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
                data-root="true"
                ref={node => this.elem = node}
                className={classNames(className, value.status.toLowerCase())}
                onInput={this.onInputChange}
                onBlur={this.emitChange}
                onFocus={this.handleFocus}
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