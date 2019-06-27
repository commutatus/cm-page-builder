import uuid from 'uuid/v5'
import moment from 'moment'

import { SET_CURRENT_ELEM } from './currentElemReducer';

export const ADD_COMPONENT = 'ADD_COMPONENT'
export const UPDATE_COMPONENT = 'UPDATE_COMPONENT'
export const UPDATE_COMPONENT_TYPE = 'UPDATE_COMPONENT_TYPE'
export const REMOVE_COMPONENT = 'REMOVE_COMPONENT'
export const INIT_COMPONENTS = 'INIT_COMPONENTS'

//Created using CLI
const CUSTOM_NAMESPACE = '1c57b4cd-4040-463f-9179-84e9ba9b66fa'
function createID(){
  return uuid(`${moment().format('DDMMYYYY')}-${window.performance.now()}`, CUSTOM_NAMESPACE) 
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

export const initComponents = (data) => {
  return dispatch => {
    if(data.length > 0){
      dispatch(({ type: INIT_COMPONENTS, data }))
    }
    else{
      dispatch({ type: ADD_COMPONENT })
    }
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
  // let { componentData } = state
  // let newData = []
  // newData = data.concat(componentData)
  return { componentData: data }
}

//Accept the current state and data about old elem so we can create a new component as needed.
function addComponent(state, data = {}){
  const {componentData} = state
  const {id, componentType} = data
  let temp = []
  let position = 1
  for(let i in componentData){
    let componentId = componentData[i].id
    if(id === componentId){
      temp.push({...componentData[i], position})
      temp.push({content: '', position: position+1, componentType: componentType, id: data.newId, initial: true})
      position += 2
    }
    else{
      temp.push({...componentData[i], position})
      position++
    }
  }
  if (componentData.length === 0)
    temp.push({content: '', position: 1, componentType: componentType, id: data.newId, initial: true})
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
  return {componentData}
}

function removeComponentFromState(state, data){
  if(state.componentData.length > 1){
    const {componentData} = state
    const {blockId} = data
    let temp = []
    let position = 1
    for(let i in componentData){
      let componentId = componentData[i].id
      if(blockId === componentId){
        continue
      }
      else{
        temp.push({...componentData[i], position})
        position++
      }
    }
    return ({componentData: temp})
  }else{
    return initialState
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
    case REMOVE_COMPONENT:
      return removeComponentFromState(state, action.data)
    default:
      return state
  }
}