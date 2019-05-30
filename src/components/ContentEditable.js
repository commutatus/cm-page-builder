import React from 'react'
import ReactDOM from 'react-dom'
export default class ContentEditable extends React.Component{
  
  shouldComponentUpdate(nextProps){
    return nextProps.html !== (this.elem && this.elem.innerHTML)
  }

  onTextEdit = (e) => {
    e.preventDefault()
    let selection = window.getSelection()
    if(selection.anchorNode.isSameNode(selection.focusNode)){
      // console.log('selected text: ', selection.anchorNode)
      let type = e.target.dataset.name

    }

  }

  emitChange = () => {
    var html = this.elem.innerHTML
    this.elem.style = `-webkit-text-fill-color: ${html ? '#1D2129' : '#9EA0A4'}`
    if (this.props.onChange && html !== this.lastHtml) {
      console.log(html)
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
      <div>
        <div
          ref={node => this.elem = node}
          className={className}
          onInput={this.emitChange} 
          onBlur={this.emitChange}
          contentEditable
          placeholder={placeholder}
          dangerouslySetInnerHTML={{__html: this.props.html}}
          styles={styles}
        />
        {/* <div>
          <div data-name="bold" onMouseDown={this.onTextEdit}>Bold</div>
          <div data-name="italics" onMouseDown={this.onTextEdit}>Italics</div>
          <div data-name="strike-through" onMouseDown={this.onTextEdit}>Strike Through</div>
        </div> */}
      </div>
    )
  }
}