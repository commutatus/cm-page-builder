import React from 'react'
import { CSSTransition } from 'react-transition-group'
import '../styles/components/AddComponent.css'

export class AddComponent extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      showActionBtn: true,
      pageComponentType: props.currentType 
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.currentType !== nextProps.currentType){
      this.setState({
        pageComponentType: nextProps.currentType, 
      })
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
        id={this.props.id} 
        content="" 
        handleUpdate={this.props.handleUpdate}
        onInputChange={this.handleInput}
      />
    )
  }
  
  handleTypeSelect = (e) => {
    this.setState({pageComponentType: e.currentTarget.dataset.type})
  }

  render(){
    let { showActionBtn } = this.state
    return( 
      <div className="add-component-container" ref={node => this.elem = node}>
        {this.getPageComponent(this.state.pageComponentType)}
        <CSSTransition
          in={showActionBtn}
          timeout={300}
          classNames="fade"
        >
          <React.Fragment>
            {
              showActionBtn && 
              <div className="text-type-tools" style={{display: this.state.html ? 'none' : 'flex'}}>
                <div data-type="Header1" onClick={this.handleTypeSelect}>
                  <i className="cm-h1" />
                </div>
                <div data-type="Header2" onClick={this.handleTypeSelect}>
                  <i className="cm-h2" />
                </div>
                <div>
                  <i className="cm-numbers" />
                </div>
                <div>
                  <i className="cm-bullets" />
                </div>
                <div>
                  <i className="cm-page" />
                </div>
                <div data-type="Upload" onClick={this.handleTypeSelect}>
                  <i className="cm-picture" />
                </div>
                <div>
                  <i className="cm-video" /> 
                </div>
                <div data-type="Embed" onClick={this.handleTypeSelect}>
                  <i className="cm-upload" /> 
                </div>
                <div>
                  <i className="cm-divider" />  
                </div>
              </div>
            }
          </React.Fragment>
        </CSSTransition>
      </div>
    )
  }
}