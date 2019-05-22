import React from 'react'
import ReactDOM from 'react-dom'
export default class ContentEditable extends React.Component{
  
  shouldComponentUpdate(nextProps){
      return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML
  }

  emitChange = () => {
    let node = ReactDOM.findDOMNode(this)
    var html = node.innerHTML
    console.log(html)
    node.style = `-webkit-text-fill-color: ${html ? 'black' : 'rgba(55, 53, 47, 0.2)'}`
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
      <div 
        className={className}
        onInput={this.emitChange} 
        onBlur={this.emitChange}
        contentEditable
        placeholder={placeholder}
        dangerouslySetInnerHTML={{__html: this.props.html}}
        styles={styles}
      />
    )
  }
}