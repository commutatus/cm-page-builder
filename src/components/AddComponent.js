import React from 'react'
import { CSSTransition } from 'react-transition-group'
import '../styles/components/AddComponent.css'
import { connect } from 'react-redux';
import {
  addNewComponent,
  updateComponent
} from '../redux/reducers/appDataReducers'

class AddComponent extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      showActionBtn: true,
      // pageComponentType: props.currentType 
    }
  }

  componentDidMount(){
    let {currentElem, id} = this.props
    if(currentElem.elemId && id === currentElem.elemId){
      this.checkAndFocus(id)
    }
  }

  // componentWillReceiveProps(nextProps){
  //   this.setState({
  //     pageComponentType: nextProps.currentType, 
  //   })
  // }
  
  componentDidUpdate(){
    let {currentElem, id} = this.props
    if(currentElem.elemId && id === currentElem.elemId){
      this.checkAndFocus(id)
    }
  }

  checkAndFocus = (id) => {
    let elem = document.querySelector(`[data-block-id="${id}"] [data-root="true"]`)
    if(elem !== document.activeElement){
      elem.focus()
    }
  } 

  handleInput = (data) => {
    this.setState({showActionBtn: !data})
  }

  handleClick = (e) => {
    console.log(e.currentTarget)
    if(document.querySelector(`[data-block-type="component-select-div"]`).contains(e.target)){
      let currentTarget = e.currentTarget
      let target = e.target.nodeName === 'I' ? e.target.parentNode : e.target
      this.props.updateComponent({currentTarget, target, action: 'updateComponentType'})
    }
    // this.setState({pageComponentType: e.currentTarget.dataset.type}, () => {
    //   if(this.state.pageComponentType === 'Divider'){
    //     this.props.handleUpdate({component_type: 'Divider', position: this.props.position, content: `divider-${this.props.position}`})
    //   }
    // })
  }

  handleTypeSelect = () => {}

  handleKeyDown = (e) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault()
        this.props.addNewComponent({id: e.target.dataset.blockId})
        break;
      default:
        break;
    }
  }

  render(){
    let { showActionBtn } = this.state  
    // console.log(this.props)
    return( 
      <div 
        className="add-component-container" 
        ref={node => this.elem = node} 
        onKeyDown={this.handleKeyDown}
        onClick={this.handleClick}
        data-block-id={this.props.id}
      >
        {this.props.children}
        <CSSTransition
          in={showActionBtn}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <React.Fragment>
            {
              <div className="text-type-tools" data-block-type="component-select-div" style={{display: this.state.html ? 'none' : 'flex'}}>
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

const mapDispatchToProps = {
  addNewComponent,
  updateComponent
}

export default connect(state => state, mapDispatchToProps)(AddComponent)