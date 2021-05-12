import React from 'react'
import classNames from 'classnames';
import sanitizeHtml from 'sanitize-html'
import { connect } from 'react-redux';
import {
  setCurrentElem,
  removeCurrentElem,
  resetCaretManipulation,
} from '../redux/reducers/currentElemReducer'
import { PermissionContext } from '../contexts/permission-context';
import {
  addNewComponent
} from '../redux/reducers/appDataReducers'
import {setCursorToEnd} from '../utils/helpers'
import { REGEX_FILTER_TAGS } from '../utils/constant' 
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
    

  //Moves the caret to the end of the range of the current element
  moveCaretToEnd = () => {
    let range, selection;
    if (document.createRange) {
      range = document.createRange();
      range.selectNodeContents(this.elem);
      range.collapse(false);
      selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  handleFocusAndBlur = (oldProps) => {
    const { currentElem, resetCaretManipulation } = this.props;
    if (currentElem.elemId === this.props.id) {
      //Focus the element only if it's not focued already
      if (this.elem && this.elem !== document.activeElement) {
        this.elem.focus();
        //Move the caret to the end of the contenteditable division alone, if flag is set in the store
        if (
          currentElem.shouldCaretMoveToEnd &&
          this.elem.getAttribute("contenteditable") === "true"
        ) {
          //Reset the flag
          resetCaretManipulation();
          this.moveCaretToEnd();
        }
      }
    } else if (oldProps && currentElem.elemId === oldProps.currentElem.elemId) {
      if (this.elem) this.elem.blur();
    }
  };

  emitChange = (e) => {
    if (!this.props.componentType && e.target.innerHTML) {
      let content = e.target.innerHTML
      if(this.props.id === `page-title` && e.target.innerText){
        content = e.target.innerText.replace(REGEX_FILTER_TAGS, "")
      }
      this.context.emitUpdate(null, { content }, 'updateTitle')
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
    if(e.target.nodeName === 'A'){
      window.open(e.target.href)
    }
    if(this.props.id === 'page-title'){
      this.props.setCurrentElem(this.props.id)
    }
  }

  render() {
    const { placeholder, className, styles, listOrder, content } = this.props
    const {context, status} = this
    const isEdit = status === 'Edit'
    const actions = {
      //onMouseUp: this.handleMouseUp,
      onBlur: this.emitChange,
      //onSelect: context.handleSelection,
      onFocus: this.handleFocus,
      onMouseDown: this.handleMouseDown,
      onKeyDown: this.handleNewLine,
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
  resetCaretManipulation,
}
export default connect(mapStateToProps, mapDispatchToProps)(ContentEditable)