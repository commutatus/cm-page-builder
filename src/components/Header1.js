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
          <div className="bold-tool-btn">B</div>
          <div className="tool-btn">
            <i className="cm-italic" />
          </div>
          <div className="tool-btn">
            <i className="cm-strikethrough" />
          </div>
          <div className="tool-btn">
            <i className="cm-link" />
          </div>
          <div className="divider"></div>
          <div className="tool-btn">
            <i className="cm-h1" />
          </div>
          <div className="tool-btn">
          <i className="cm-h2" />
          </div>
          <div className="tool-btn">
            <i className="cm-bullets" />
          </div>
          <div className="tool-btn">
            <i className="cm-numbers" />
          </div>
        </div>
      </React.Fragment>
    )
  }
}
  