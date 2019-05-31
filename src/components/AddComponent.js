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
        <div className="type-container">
          <div data-type="Header1" onClick={this.handleTypeSelect}>h1</div>
          <div data-type="Header2" onClick={this.handleTypeSelect}>h2</div>
          <div data-type="Header3" onClick={this.handleTypeSelect}>h3</div>
          {/* <div data-type="Header1" onClick={this.handleTypeSelect}>Li</div> */}
          <div data-type="Upload" onClick={this.handleTypeSelect}>Img</div>
          <div data-type="Embed" onClick={this.handleTypeSelect}>emb</div>
        </div>
      </div>
    )
  }
}