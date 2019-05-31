import React from 'react'
import ReactDOM from 'react-dom'
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
      console.log(this)
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
    this.elem.style = `-webkit-text-fill-color: ${html ? '#1D2129' : '#9EA0A4'}`
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
        target: {
          value: html
        }
      });
    }
    this.lastHtml = html;
    
  }

  render() {
    const { placeholder, className, styles } = this.props
    return(
      <PermissionContext.Consumer>
        {
          (value) => 
            <div style={{width:'100%'}}>
              <div
                ref={node => this.elem = node}
                className={className}
                onBlur={this.emitChange}
                contentEditable
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