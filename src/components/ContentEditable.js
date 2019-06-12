import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames';
import { PermissionContext } from '../contexts/permission-context';
import sanitizeHtml from 'sanitize-html'

export default class ContentEditable extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      showMoreOptions: false
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    return (nextProps.html !== (this.elem && this.elem.innerHTML) )|| nextState.showMoreOptions !== this.state.showMoreOptions
  }

  handleKeyPress = (e, handleAction) => {
    switch(e.key){
      case 'Enter':
        e.preventDefault()
        if (this.props.orderedList)
          handleAction('olist', this.props.id, this.elem)
        else
          handleAction('add-component', this.props.id, this.elem)
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

  optionHandleClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
    this.setState({showMoreOptions: true})
  }

  render() {
    const { placeholder, className, styles, handleMouseUp } = this.props
    const {showMoreOptions} = this.state
    console.log(this.state)
    return(
      <PermissionContext.Consumer>
        {
          (value) => 
            <div className="component-section">
              {
                className !== 'cm-title' && value.status === 'Edit' &&
                <div className="component-dragger" onClick={this.optionHandleClick}><i className="cm cm-handle" />
                  {
                    showMoreOptions &&
                    <div onMouseUp={(e) => e.stopPropagation()}>test</div>
                  }
                </div>
              }
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