import uuid from 'uuid/v5'
import moment from 'moment'

import { SET_CURRENT_ELEM } from './currentElemReducer';

export const ADD_COMPONENT = 'ADD_COMPONENT'
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
  console.log('newstate', newState)
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
          client_reference_id: data.id
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

  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_COMPONENTS: 
      return initializeComponentsInState(state, action.data)
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