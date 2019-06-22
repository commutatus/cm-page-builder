import React from 'react'
import { CSSTransition } from 'react-transition-group'
import '../styles/components/AddComponent.css'
import { connect } from 'react-redux';
import {
  addNewComponent,
  updateComponentType,
  removeComponent
} from '../redux/reducers/appDataReducers'
import {
  setCurrentElem,
  removeCurrentElem
} from '../redux/reducers/currentElemReducer'
import { TEXT_INPUT_COMPONENT } from '../utils/constant';
import DragHandle from './DragHandle';
import { PermissionContext } from '../contexts/permission-context';

class AddComponent extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      showActionBtn: false,
      isFocused: false
    }
  }

  componentDidMount(){
    this.checkAndFocus(this.props)
  }
  
  componentDidUpdate(){
    this.checkAndFocus(this.props)
  }

  // For newly created component to change the focus
  checkAndFocus = (props) => {
    let {currentElem, id} = props
    if(currentElem.elemId && id === currentElem.elemId){
      let elem = document.querySelector(`[data-block-id="${id}"] [data-root="true"]`)
      if(elem && elem !== document.activeElement){
        elem.focus()
      }
    }
  }

  //Change the component type.
  handleClick = (e) => {
    this.props.setCurrentElem(this.props.id)
    let comSelDiv = this.elem.querySelector(`[data-block-type="component-select-div"]`)
    if(comSelDiv && comSelDiv.contains(e.target)){
      let currentTarget = e.currentTarget
      let target = e.target.nodeName === 'I' ? e.target.parentNode : e.target
      this.props.updateComponentType({blockId: currentTarget.dataset.blockId, type: target.dataset.type})
    }
  }

  // handle key action and navigation
  handleKeyDown = (e) => {
    let {appData, currentElem, data} = this.props 
    let currentElemPos
    switch (e.key) {
      case 'Enter':
        if(!e.shiftKey){
          e.preventDefault()
          let componentType =  ['Ulist', 'Olist'].includes(e.currentTarget.dataset.componentType) ? e.currentTarget.dataset.componentType : 'Text'
          this.props.addNewComponent({id: e.currentTarget.dataset.blockId, componentType })
          break;
        }
      case 'Backspace':
        if(this.elem.querySelector(`[data-root="true"]`).innerHTML === ''){
          if (this.props.data.componentType === 'Ulist' || this.props.data.componentType === 'Olist')
            this.props.updateComponentType({blockId: e.currentTarget.dataset.blockId, type: 'Text'})
          else {
            e.preventDefault()
            let newCurrentId = null
            let fromIndex = appData.componentData.findIndex(object => object.id === currentElem.elemId)
            newCurrentId = appData.componentData[fromIndex-1].id
            this.props.removeComponent({blockId: currentElem.elemId})
            this.props.setCurrentElem(newCurrentId)
          }
        }
        break
      case 'ArrowUp':
        currentElemPos = appData.componentData.findIndex(data => data.id === currentElem.elemId)
        while(currentElemPos > 0){
          if(TEXT_INPUT_COMPONENT.includes(appData.componentData[currentElemPos-1].componentType)){
            this.props.setCurrentElem(appData.componentData[currentElemPos-1].id)
            break
          }
          currentElemPos--
        }
        break
      case 'ArrowDown':
          currentElemPos = appData.componentData.findIndex(data => data.id === currentElem.elemId)
          while(currentElemPos < appData.componentData.length - 1){
            if(TEXT_INPUT_COMPONENT.includes(appData.componentData[currentElemPos+1].componentType)){
              this.props.setCurrentElem(appData.componentData[currentElemPos+1].id)
              break
            }
            currentElemPos++
          }
          break
      default:
        break;
    }
  }

  handleInput = (e) => {
    this.setState({showActionBtn: e.target.innerHTML === ''})
  }

  handleFocus = (e) => {
    this.setState({showActionBtn: e.target.innerHTML === '', isFocused: true})
    this.setCursorToEnd(e) 
  }

  // Method to position the cursor at the end of the content
  setCursorToEnd = (e) => {
    var range = document.createRange();
    var sel = window.getSelection();
    if(e.target.innerHTML){
      range.setStart(e.target.lastChild, e.target.lastChild.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
  
  handleBlur = (e) => {
    this.setState({showActionBtn: false, isFocused: false})
  }

  render(){
    let { data } = this.props
    let { showActionBtn, showHandle, isFocused } = this.state
    return( 
      <PermissionContext.Consumer>
        {
          value => {
            const isEdit = value.status === 'Edit'
            const allActions = isEdit ? {
              'onMouseDown': this.handleClick,
              'onKeyDown': this.handleKeyDown,
              'data-component-type': data.componentType,
              'onBlur':this.handleBlur,
              'onInput':this.handleInput,
              'onFocus':this.handleFocus,
              'onMouseEnter':() => this.setState({showHandle: true}),
              'onMouseLeave':() => this.setState({showHandle: false}),
            } : {}
            return(
              <div 
                ref={node => this.elem = node} 
                className="add-component-container" 
                data-block-id={this.props.id}
                {...allActions}
              >
                {(showHandle || isFocused) && <DragHandle id={data.id}/>}
                { React.cloneElement(this.props.children, { ...this.props.children.props, ...data }) }
                <CSSTransition
                  in={showActionBtn}
                  timeout={300}
                  classNames="fade"
                  unmountOnExit
                >
                  <div className="text-type-tools" data-block-type="component-select-div" style={{display: showActionBtn && data.componentType !== 'Divider' ? 'flex' : 'none'}}>
                    <div data-type="Header1">
                      <i className="cm-h1" />
                    </div>
                    <div data-type="Header2">
                      <i className="cm-h2" />
                    </div>
                    <div data-type="Olist" >
                      <i className="cm-numbers" />
                    </div>
                    <div data-type="Ulist">
                      <i className="cm-bullets" />
                    </div>
                    <div>
                      <i className="cm-page" />
                    </div>
                    <div data-type="Upload">
                      <i className="cm-picture" />
                    </div>
                    <div data-type="Embed">
                      <i className="cm-video" /> 
                    </div>
                    {/* <div data-type="Upload" onClick={this.handleTypeSelect}>
                      <i className="cm-upload" /> 
                    </div> */}
                    <div data-type="Divider">
                      <i className="cm-divider" />  
                    </div>
                  </div>
                </CSSTransition>
              </div>
            )
          }
          
        }
      </PermissionContext.Consumer>
    )
  }
}

const mapDispatchToProps = {
  addNewComponent,
  updateComponentType,
  removeComponent,
  setCurrentElem,
  removeCurrentElem
}

export default connect(state => state, mapDispatchToProps)(AddComponent)