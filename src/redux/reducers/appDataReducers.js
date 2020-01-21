import uuid from 'uuid/v5'
import moment from 'moment'

import { SET_CURRENT_ELEM } from './currentElemReducer';
import { 
  isAllowedTag, 
  getComponentFromTag, 
  // isTextTag, 
  isInlineElement, 
  convertObjectToText, 
  isTagAllowedToCreateComponent, 
  toDataURL 
} from '../../utils/helpers';
// import { TAGS_TO_COMPONENT_MAP, IS_INLINE_COMPONENT } from '../../utils/constant';

export const ADD_COMPONENT = 'ADD_COMPONENT'
export const BULK_ADD_COMPONENT = 'BULK_ADD_COMPONENT'
export const UPDATE_COMPONENT = 'UPDATE_COMPONENT'
export const UPDATE_COMPONENT_TYPE = 'UPDATE_COMPONENT_TYPE'
export const REMOVE_COMPONENT = 'REMOVE_COMPONENT'
export const INIT_COMPONENTS = 'INIT_COMPONENTS'
export const UPDATE_POS = 'UPDATE_POS'
export const RESET = 'RESET'

//Created using CLI
const CUSTOM_NAMESPACE = '1c57b4cd-4040-463f-9179-84e9ba9b66fa'
function createID(){
  return uuid(`${moment().format('DDMMYYYY')}-${window.performance.now()}-${window.cmPageBuilder.pid}`, CUSTOM_NAMESPACE) 
}

export const addNewComponent = (data) => {
  return dispatch => {
    //Try not to change it as the application may not work properly and can create inconsistency in the database.
    let newId = createID()
    dispatch({
      type: ADD_COMPONENT, 
      data: {...data, newId}
    })
    dispatch({
      type: SET_CURRENT_ELEM,
      elemId: newId
    })
  }
}

export const resetApp = () => {
  return({type: RESET})
}
export const updatePosition = (data) => {
  return({type: UPDATE_POS, data})
}

export const initComponents = (data = []) => {
  return dispatch => {
    dispatch({ 
      type: INIT_COMPONENTS, 
      data: data
    })
  }
}

export const removeComponent = (data) => {
  return ({type: REMOVE_COMPONENT, data})
}

export const updateComponent = (data) => {
  return ({type: UPDATE_COMPONENT, data})
}

export const updateComponentType = (data) => {
  return ({type: UPDATE_COMPONENT_TYPE, data})
}

export const bulkCreate = (parsedData) => {
  return (dispatch, getState) => {
    // console.log(getState()) 
    let data = {}, newData = []

    const traverseTree = (root) => {
      if(root.childNodes.length > 0){
        root.childNodes.forEach((node, i) => {
          if(isAllowedTag(node.tagName, root.tagName)){
            // console.log(node)
            //Traverse tree untill you find a inline element node.
            if(node.childNodes.length > 0 && !isInlineElement(node.tagName)){
              traverseTree(node)
            }
            //Convert different elem to there respective component
            let siblingNode = newData[newData.length - 1]

            //Handle inline component => truncate invalid tags and create text.
            if(isInlineElement(node.tagName)){
              let content = convertObjectToText(node)
              if(siblingNode && siblingNode.componentType === 'Text'){
                siblingNode.content = `${siblingNode.content}${content}`
              }else{
                newData.push({
                  content,
                  componentType: getComponentFromTag(node.tagName) || 'Text',
                  id: createID(),
                })
              }
            }
            //Handle block component => truncate components which are not supported.
            else if(isTagAllowedToCreateComponent(node.tagName)){
              // console.log(root.tagName)
              const ID = createID()
              const getImage = (src, id) => {
                return !src.includes('base64') ? downloadAndCreateComponent(src, id, dispatch) : {filename: 'attachements', content: src}
              }
              newData.push({
                content: node.tagName === 'li' ? node.childNodes[0].rawText : node.rawText,
                component_attachment: node.tagName === 'img' ? getImage(node.attributes.src, ID) : null,
                componentType: getComponentFromTag(node.tagName, root.tagName),
                id: ID,
              })
            }
          }
        })
      }
    }
    console.log(parsedData)
    traverseTree(
      parsedData
    )
    dispatch({type: BULK_ADD_COMPONENT, data: {newData, focusedElemId: getState().currentElem.elemId}})
  }
}

function downloadAndCreateComponent(src, id, dispatch){
  toDataURL(src, (dataUrl, id, dispatch)=> {
    dispatch({type: UPDATE_COMPONENT, data: {id, newState: {component_attachment: {filename: 'attachements', content: dataUrl }}}})
  })
  return null
}

function bulkCreateComponent(state, data){
  const {componentData} = state
  let temp = [], indexCount = 1
  
  componentData.forEach((component) => {
    temp.push({...component, position: indexCount})
    indexCount++
    if(component.id === data.focusedElemId){
      data.newData.forEach((item) => {
        let newData = {...item, position: indexCount}
        temp.push(newData)
        emitUpdate(newData, 'add')
        indexCount++
      })
    }
    
  })
  return {componentData: temp}
}

const initialState = {
  componentData: []
}

//Accepts the initial components data 
function initializeComponentsInState(state, data) {
  return { componentData: data ? data : [] }
}

//Accept the current state and data about old elem so we can create a new component as needed.
function addComponent(state, data = {}){
  const {componentData} = state
  const {id, componentType} = data
  let temp = []
  let position = 1
  let newCom = null
  for(let i in componentData){
    let componentId = componentData[i].id
    if(id === componentId){
      temp.push({...componentData[i], position})
      newCom = {content: data.content ? data.content : '', position: position+1, componentType: componentType, id: data.newId}
      temp.push(newCom)
      position += 2
    }
    else{
      temp.push({...componentData[i], position})
      position++
    }
  }
  if (componentData.length === 0 || !data.id){
    newCom = {content: '', position: 1, componentType: componentType, id: data.newId}
    temp.unshift(newCom)
  }
  let tempCom =  { ...newCom }
  tempCom.content = ""
  emitUpdate(tempCom, 'add')
  return {componentData: temp}
}


function updateComponentTypeState(state, data){
  let {componentData} = state
  let {blockId, type} = data
  componentData = componentData.map(component => {
    if(component.id === blockId){
      return ({...component, componentType: type })
    }else{
      return component
    }
  })
  emitUpdate({id: blockId, componentType: type}, 'update')
  return {componentData}
}

function updateComponentState(state, data){
  let {componentData} = state
  let {newState, id} = data
  componentData = componentData.map(component => {
    if(component.id === id){
      return ({...component, ...newState })
    }else{
      return component
    }
  })
  emitUpdate({id, ...newState}, 'update')
  return {componentData}
}

function removeComponentFromState(state, data){
  if(state.componentData.length > 0){
    const {componentData} = state
    const {blockId} = data
    let temp = []
    let position = 1
    for(let i in componentData){
      let componentId = componentData[i].id
      if(blockId === componentId){
        // isInital = componentData[i].initial
        continue
      }
      else{
        temp.push({...componentData[i], position})
        position++
      }
    }
      emitUpdate({id: blockId}, 'remove')
    return ({...state, componentData: temp})
    
  }else{
    return initialState
  }
}

function updateComponentPos(state, {newIndex, oldIndex}) {
  let newData = []
  let elem = state.componentData[oldIndex]
  newData = state.componentData.filter((d, i) => i !== oldIndex)
  newData.splice(newIndex, 0, elem)	
  emitUpdate({id: state.componentData[oldIndex].id, position: newIndex+1}, 'update')
  return ({
    ...state, 
    componentData: newData.map((d, i) => ({...d, position: i+1}))
  })
}

function emitUpdate(data, type){
  // return
  switch(type){
    case 'add':
      window.cmPageBuilder.handleUpdate(
        null, 
        { 
          content: data.content, 
          position: data.position, 
          component_type: data.componentType, 
          client_reference_id: data.id,
          component_attachment: data.component_attachment
        }, 
        'createComponent'
      )
      break
      case 'update':
        window.cmPageBuilder.handleUpdate(
          data.id, 
          { 
            content: data.content, 
            position: data.position, 
            component_type: data.componentType,
            component_attachment: data.component_attachment
          }, 
          'updateComponent'
        )
      break;
      case 'remove':
        window.cmPageBuilder.handleUpdate(
          data.id,
          null,
          'deleteComponent'
        )
      default:
        console.error('invalid mutation type.')

  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_COMPONENTS: 
      return initializeComponentsInState(state, action.data)
    case BULK_ADD_COMPONENT:
      return bulkCreateComponent(state, action.data)
    case ADD_COMPONENT:
      return addComponent(state, action.data)
    case UPDATE_COMPONENT_TYPE:
      return updateComponentTypeState(state, action.data)
    case UPDATE_COMPONENT:
      return updateComponentState(state, action.data)
    case UPDATE_POS:
      return updateComponentPos(state, action.data)
    case REMOVE_COMPONENT:
      return removeComponentFromState(state, action.data)
    case RESET: 
      return initialState
    default:
      return state
  }
}

