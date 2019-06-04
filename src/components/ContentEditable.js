import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames';
import { PermissionContext } from '../contexts/permission-context';


export default class ContentEditable extends React.Component{

  constructor(props){
    super(props)
    this.state = {}
  }

  shouldComponentUpdate(nextProps){
    return nextProps.html !== (this.elem && this.elem.innerHTML)
  }

  onTextEdit = (e) => {
    // e.preventDefault()
    // let selection = window.getSelection()
    // if(selection.anchorNode.isSameNode(selection.focusNode)){
    //   // console.log('selected text: ', selection.anchorNode)
    //   let type = e.target.dataset.name

    // }

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

  handleKeyUp = (e, handleAction) => {
    if(e.key === 'Backspace'){
      if(!this.elem.innerHTML){
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
    const { placeholder, className, styles } = this.props
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
                contentEditable={value.status === 'Edit'}
                placeholder={placeholder}
                dangerouslySetInnerHTML={{__html: this.props.html}}
                styles={styles}
                onKeyPress={(e) => this.handleKeyPress(e, value.handleAction)}
                onKeyUp={(e) => this.handleKeyUp(e, value.handleAction)}
              />
          </div>
        }
      </PermissionContext.Consumer>
    )
  }
}