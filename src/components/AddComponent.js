import React from 'react'
// import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import '../styles/components/AddComponent.css'
import { connect } from 'react-redux';
import {
  addNewComponent,
  updateComponentType,
  updateComponent,
  removeComponent,
  bulkCreate,
} from '../redux/reducers/appDataReducers'
import {
  setCurrentElem,
  removeCurrentElem,
  moveCaretToEnd,
} from '../redux/reducers/currentElemReducer'
import { TEXT_INPUT_COMPONENT, DEFAULT_COMPONENT_TYPES } from '../utils/constant';
import DragHandle from './DragHandle';
import { PermissionContext } from '../contexts/permission-context';
import {setCursorToEnd} from '../utils/helpers'
import {parse} from 'node-html-parser'
import _ from 'lodash'
// const split = require('split-string');

//A higher order component for the generic components to handle there functionalily.

class AddComponent extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      showActionBtn: false,
      isFocused: false,
      showHandle:false
    }
    AddComponent.contextType = PermissionContext
  }

  componentWillMount(){
    this.checkAndFocus(this.props)
  }

  componentWillReceiveProps(nextProps){
    this.checkAndFocus(nextProps)
  }

  shouldComponentUpdate(nextProps, nextState){
    return (
      (this.props.id !== nextProps.id) ||
      (this.state.showHandle !== nextState.showHandle) ||
      (this.state.showActionBtn !== nextState.showActionBtn) ||
      (this.state.isFocused !== nextState.isFocused)
    )
  }

  // For newly created component to change the focus
  checkAndFocus = (props) => {
    let {currentElem, id} = props
    let {isFocused} = this.state
    //Compare the old and the new element to check focused has changed or not
    if(currentElem.elemId && id === currentElem.elemId){
      //check if focused or not
      if(!isFocused){
        this.setState({isFocused: true})
      }
    }
    else{
      //when focus is removed doesn't show the handle and the btns
      if(this.state.showActionBtn || this.state.isFocused)
        this.setState({showActionBtn: false, isFocused: false})
    }
  }

  //Change the component type.
  handleMouseUp = (e) => {
    let comSelDiv = this.elem.querySelector(`[data-block-type="component-select-div"]`)
    if(comSelDiv && comSelDiv.contains(e.target)){
      let currentTarget = e.currentTarget
      let target = e.target.nodeName === 'I' ? e.target.parentNode : e.target
      this.props.updateComponentType({blockId: currentTarget.dataset.blockId, type: target.dataset.type})
    }
  }

  // handle key action and navigation
  handleKeyDown = (e) => {
    e.stopPropagation()
    let {appData, currentElem, data} = this.props

    //Code component only need navigation so other key actions are disabled.
    if(this.props.data.componentType === 'Code' && !['ArrowUp', 'ArrowDown'].includes(e.key)) return

    //Intialize all the elem
    let currentElemPos = -1,
        elemRect = null,
        caretRect = null,
        computedStyles = null,
        elemPad = undefined,
        elemMar = undefined,
        extraHeight = undefined

    //All the key events related to the component are handled here.
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
          e.preventDefault()
          let newCurrentId = null
          let fromIndex = appData.componentData.findIndex(object => object.id === currentElem.elemId)
          if (fromIndex > 0) {
            newCurrentId = appData.componentData[fromIndex-1].id
            this.props.removeComponent({blockId: currentElem.elemId})
            this.props.setCurrentElem(newCurrentId)
            this.props.moveCaretToEnd()
          }else{
            this.props.updateComponent({id: appData.componentData[0].id, newState: {content: ''}})
          }
        }
        break
      case 'ArrowUp':
        elemRect = e.target.getBoundingClientRect()
        caretRect = window.getSelection().getRangeAt(0).getBoundingClientRect()
        computedStyles = window.getComputedStyle(e.target)
        elemPad = computedStyles.getPropertyValue("padding-top").replace('px', '')
        elemMar = computedStyles.getPropertyValue('margin-top').replace('px', '')
        extraHeight = (+elemPad)
        if((caretRect.x === 0 && caretRect.y === 0) ||  // when no text is there
            (elemRect.top === (caretRect.top - extraHeight)) || // is not a text component
            (elemRect.top === (caretRect.top - extraHeight - 1)) // is a text component
        ){
          e.preventDefault()
          //skip component if not a text component else navigate
          currentElemPos = appData.componentData.findIndex(data => data.id === currentElem.elemId)
          while(currentElemPos > 0){
            if(TEXT_INPUT_COMPONENT.includes(appData.componentData[currentElemPos-1].componentType)){
              this.props.setCurrentElem(appData.componentData[currentElemPos-1].id)
              break
            }
            currentElemPos--
          }
        }
        break
      case 'ArrowDown':
          elemRect = e.target.getBoundingClientRect()
          caretRect = window.getSelection().getRangeAt(0).getBoundingClientRect()
          computedStyles = window.getComputedStyle(e.target)
          elemPad = computedStyles.getPropertyValue("padding-bottom").replace('px', '')
          elemMar = computedStyles.getPropertyValue('margin-bottom').replace('px', '')
          extraHeight = (+elemPad)
          if((caretRect.x === 0 && caretRect.y === 0) ||
              (elemRect.bottom === (caretRect.bottom - extraHeight)) ||
              (elemRect.bottom === (caretRect.bottom + extraHeight + 1))
          ){
            e.preventDefault()
            currentElemPos = appData.componentData.findIndex(data => data.id === currentElem.elemId)
            while(currentElemPos < appData.componentData.length - 1){
              if(TEXT_INPUT_COMPONENT.includes(appData.componentData[currentElemPos+1].componentType)){
                this.props.setCurrentElem(appData.componentData[currentElemPos+1].id)
                break
              }
              currentElemPos++
            }
          }
          break
      default:
        break;
    }
  }

  debouncedSave = _.debounce((id, e, emitOnly = false) => {
    this.props.updateComponent({id, newState: {content: e.target.innerHTML}, emitOnly});
  }, 300);

  handleInput = (e) => {
    e.persist();
    this.setState({showActionBtn: e.target.innerHTML === '' && !e.target.value})

    // Same as onBlur
    if(this.props.data.componentType !== 'Embed') {
      this.debouncedSave(this.props.id, e, true)
    }
  }

  // handles the focus and set the cursor to right position.
  handleFocus = (e) => {
    e.persist()
    this.setState({showActionBtn: e.target.innerHTML === '', isFocused: true})
    let {appData, currentElem} = this.props
    let prevElemPos, currElemPos
    for(let i in appData.componentData){
      if(appData.componentData[i].id === currentElem.elemId){
        currElemPos = +i
      }
      if(appData.componentData[i].id === currentElem.prevSelectedElemId){
        prevElemPos = +i
      }
    }
    //Put caret at end if nav b/w component.
    if(currElemPos < prevElemPos)
      setCursorToEnd(e)
  }

  handleMouseDown = (e) => {
    let handle = document.getElementById('drag-handle')
    if(!(handle && handle.contains(e.target)))
      this.props.setCurrentElem(this.props.id)
  }

  handleBlur = (e) => {
    if(this.props.data.componentType !== 'Embed' && this.props.id !== this.props.currentElem.elemId)
      this.props.updateComponent({id: this.props.id, newState: {content: e.target.innerHTML}})
  }

  handleMouseEnter = () => {
    if (this.props.currentElem.elemId === this.props.id){
      this.props.setCurrentElem(this.props.id)
    }
    this.setState({ showHandle: true })
  }

  handleMouseLeave = () => {
    this.setState({ showHandle: false })
  }

  handleInlineStyles = (type)=> {
   let styles = {
    margin: (type === 'Header1') ? '32px 0px 4px 0px' : (type==='Header2') ? '16px 0px 4px 0px' : ''
   }
   return styles
  }


  handlePaste = (e) => {
    e.persist()
    let clipboardData = e.clipboardData || window.clipboardData
    let plainText = clipboardData.getData('text/plain')
    let {componentData} = this.props.appData

    let items = clipboardData.items;
    let types = clipboardData.types;
    let fileIndex = types.findIndex(type => type === "Files")
    let blob = fileIndex !== -1 && items[fileIndex].getAsFile();

    if(blob){
      //stop the default behaviour
      e.preventDefault()
      const blockId = e.currentTarget.dataset.blockId
      let reader = new FileReader();
      reader.onload = (event) =>{
        this.props.addNewComponent({
          id: blockId,
          componentType: 'Upload',
          component_attachment: {
            filename: blob.name,
            content: event.target.result,
          }
        })
      }
      reader.readAsDataURL(blob);
    }

    else if(clipboardData.getData('text/html') || plainText){
      let dataToBeParsed = clipboardData.getData('text/html') || `<p>${plainText}</p>`
      let parsedData = parse(dataToBeParsed)
      if(parsedData.childNodes && parsedData.childNodes.length > 0 && parsedData.childNodes[0].tagName === 'html'){
        parsedData = parsedData.childNodes[0].childNodes[1]
      }
      this.props.bulkCreate(parsedData, e)
    }

  }



  render(){
    let { data, options } = this.props
    let { showActionBtn, showHandle, isFocused } = this.state
    let componentsToRender = DEFAULT_COMPONENT_TYPES
		if (options && options.length) {
			componentsToRender = componentsToRender.filter(item => options.includes(item.name))
		}
    const isEdit = this.context.status === 'Edit'


    const allActions = isEdit ? {
      'onPaste': this.handlePaste,
      'onMouseUp': this.handleMouseUp,
      'onMouseDown': this.handleMouseDown,
      'onKeyDown': this.handleKeyDown,
      'data-component-type': data.componentType,
      'onBlur':this.handleBlur,
      'onInput':this.handleInput,
      'onFocus':this.handleFocus,
      'onMouseEnter': this.handleMouseEnter,
      'onMouseLeave': this.handleMouseLeave,
    } : {}

    if(data.componentType === 'Code'){
      [
        'onPaste',
        'onMouseUp',
        'onBlur',
        'onInput',
      ].forEach(action => delete allActions[action])
    }

    return(
      <div
        ref={node => this.elem = node}
        className="widget-container"
        data-block-id={this.props.id}
        style={this.handleInlineStyles(data.componentType)}
        {...allActions}
      >
        {isEdit && (showHandle || isFocused) && <DragHandle id={data.id} />}
        { React.cloneElement(this.props.children, { ...this.props.children.props, ...data }) }
        <CSSTransition
          in={isEdit && showActionBtn}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <div className="text-type-tools"
            data-block-type="component-select-div"
            style={{display: showActionBtn && !['Divider', 'Upload', 'Code'].includes(data.componentType)  ? 'flex' : 'none'}}
          >
            {
              componentsToRender.map((type, index) => {
                return (
                  <div data-type={type.name} key={index}>
                    <i className={type.icon} />
                  </div>
                )
              })
            }
          </div>
        </CSSTransition>
      </div>
    )
  }
}

const mapDispatchToProps = {
  addNewComponent,
  updateComponentType,
  removeComponent,
  setCurrentElem,
  removeCurrentElem,
  updateComponent,
  bulkCreate,
  moveCaretToEnd,
}

const mapStateToProps = (state) => {
  currentElem: state.currentElem
}

export default connect(state => state, mapDispatchToProps)(AddComponent)
