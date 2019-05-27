import React from 'react'
import '../styles/components/AddComponent.css'

export class AddComponent extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      pageType: "Text"
    }
  }

  handleChange = (e) => {
    this.setState({
      value: [e.target.value], 
    })
  }

  _getPageComponent = (type, index) => {
		let typeName = type.split(' ').join('')
    let Component = require(`./${typeName}`)[typeName]
		return <Component key={`${type}-${index}`} />
  }
  
  handleTypeSelect = (e) => {
    this.setState({pageType: e.target.dataset.type})
  }

  render(){
    return(
      <div className="add-component-container">
        <div className="typing-area">
          {this._getPageComponent(this.state.pageType)}
        </div>
        <div className="type-container">
          <div data-type="Header1" onClick={this.handleTypeSelect}>h1</div>
          <div data-type="Header2" onClick={this.handleTypeSelect}>h2</div>
          <div data-type="Header3" onClick={this.handleTypeSelect}>h3</div>
          <div data-type="Header1" onClick={this.handleTypeSelect}>Li</div>
          <div data-type="Header1" onClick={this.handleTypeSelect}>Img</div>
          <div data-type="Header1" onClick={this.handleTypeSelect}>emb</div>
        </div>
      </div>
    )
  }
}