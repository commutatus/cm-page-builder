import React from 'react'
import '../styles/components/AddComponent.css'

export class AddComponent extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      showActionBtn: true,
      pageComponentType: "Text"
    }
  }

  handleInput = (data) => {
    this.setState({showActionBtn: !data})
  }

  getPageComponent = (type) => {
		let typeName = type.split(' ').join('')
    let Component = require(`./${typeName}`)[typeName]
    return(
      <Component 
        key={`${type}-${this.props.id}`} 
        content="" id={this.props.id} 
        handleUpdate={this.props.handleUpdate}
        onInputChange={this.handleInput}
      />
    )
  }
  
  handleTypeSelect = (e) => {
    this.setState({pageComponentType: e.target.dataset.type})
  }

  render(){
    let { showActionBtn } = this.state
    return( 
      <div className="add-component-container">
        {this.getPageComponent(this.state.pageComponentType)}
        {
          showActionBtn && 
          <div className="text-type-tools" style={{display: this.state.html ? 'none' : 'flex'}}>
            <div data-type="Header1" onClick={this.handleTypeSelect}>h1</div>
            <div data-type="Header2" onClick={this.handleTypeSelect}>h2</div>
            <div data-type="Header3" onClick={this.handleTypeSelect}>h3</div>
            {/* <div data-type="Header1" onClick={this.handleTypeSelect}>Li</div> */}
            <div data-type="Upload" onClick={this.handleTypeSelect}>Img</div>
            <div data-type="Embed" onClick={this.handleTypeSelect}>emb</div>
          </div>
        }
      </div>
    )
  }
}