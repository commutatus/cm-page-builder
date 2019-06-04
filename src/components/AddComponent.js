import React from 'react'
import '../styles/components/AddComponent.css'

export class AddComponent extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      pageComponentType: "Text"
    }
  }

  handleChange = (e) => {
    this.setState({
      html: e.target.value, 
    }, () => {
      this.props.handleUpdate({content: this.state.html, id: this.props.id}, 'AddComponent')
    })
  }

  getPageComponent = (type) => {
		let typeName = type.split(' ').join('')
    let Component = require(`./${typeName}`)[typeName]
		return <Component key={`${type}-${this.props.id}`} content="" id={this.props.id} handleUpdate={() => {}}/>
  }
  
  handleTypeSelect = (e) => {
    this.setState({pageComponentType: e.target.dataset.type})
  }

  render(){
    return(
      <div className="add-component-container">
        {this.getPageComponent(this.state.pageComponentType)}
        <div className="text-type-tools">
          <div data-type="Header1" onClick={this.handleTypeSelect}><i className="cm-h1" /></div>
          <div data-type="Header2" onClick={this.handleTypeSelect}><i className="cm-h2" /></div>
          <div><i className="cm-numbers" /></div>
          <div><i className="cm-bullets" /></div>
          <div><i className="cm-page" /></div>
          {/* <div data-type="Header1" onClick={this.handleTypeSelect}>Li</div> */}
          <div data-type="Upload" onClick={this.handleTypeSelect}><i className="cm-picture" /></div>
          <div><i className="cm-video" /></div>
          <div data-type="Embed" onClick={this.handleTypeSelect}>emb</div>
        </div>
      </div>
    )
  }
}