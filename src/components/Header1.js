import React from 'react'
import ContentEditable from './ContentEditable'
import '../styles/components/Heading.css';


export class Header1 extends React.Component{

  state = {
    html: this.props.content
  }


  handleChange = (e) => {
    this.setState({
      html: e.target.value, 
    }, () => {
      this.props.handleUpdate({content: this.state.html, id: this.props.id}, 'Title')
    })
  }

  render(){
    return(
      <React.Fragment>
        <ContentEditable 
          html={this.state.html} 
          onChange={this.handleChange} 
          placeholder="Header1"
          className="cm-header1"
          id={this.props.id}
        />
        <div className="text-selection-tool">
          <div className="tool-btn">B</div>
          <div className="tool-btn">&#8520;</div>
          <div className="tool-btn">&#167;</div>
          <div className="tool-btn">&#9996;</div>
          <div className="divider"></div>
          <div className="tool-btn">H1</div>
          <div className="tool-btn">H2</div>
          <div className="tool-btn">&#9782;</div>
          <div className="tool-btn">&#9778;</div>
        </div>
      </React.Fragment>
    )
  }
}
  