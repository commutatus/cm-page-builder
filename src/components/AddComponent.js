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
    this.setState({
      pageComponentType: nextProps.currentType, 
    })
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
          handleUpdate={this.props.handleUpdate}
          onInputChange={this.handleInput}
          currentType={this.state.pageComponentType ? this.state.pageComponentType : `Text` }
          newComponent
          order={this.props.order}
          position={this.props.position}
        />
    )
  }
  
  handleTypeSelect = (e) => {
    this.setState({pageComponentType: e.currentTarget.dataset.type}, () => {
      if(this.state.pageComponentType === 'Divider'){
        this.props.handleUpdate({component_type: 'Divider', position: this.props.position, content: `divider-${this.props.position}`})
      }
    })
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
          unmountOnExit
        >
          <React.Fragment>
            {
              <div className="text-type-tools" style={{display: this.state.html ? 'none' : 'flex'}}>
                <div data-type="Header1" onClick={this.handleTypeSelect}>
                  <i className="cm-h1" />
                </div>
                <div data-type="Header2" onClick={this.handleTypeSelect}>
                  <i className="cm-h2" />
                </div>
                {/* <div data-type="Olist" onClick={this.handleTypeSelect}>
                  <i className="cm-numbers" />
                </div>
                <div data-type="Ulist" onClick={this.handleTypeSelect}>
                  <i className="cm-bullets" />
                </div>
                <div>
                  <i className="cm-page" />
                </div> */}
                <div data-type="Upload" onClick={this.handleTypeSelect}>
                  <i className="cm-picture" />
                </div>
                <div data-type="Embed" onClick={this.handleTypeSelect}>
                  <i className="cm-video" /> 
                </div>
                {/* <div data-type="Upload" onClick={this.handleTypeSelect}>
                  <i className="cm-upload" /> 
                </div> */}
                <div data-type="Divider" onClick={this.handleTypeSelect}>
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
