import uuid from 'uuid/v4'
import { SET_CURRENT_ELEM } from './currentElemReducer';

export const ADD_COMPONENT = 'ADD_COMPONENT'
export const UPDATE_COMPONENT = 'UPDATE_COMPONENT'
export const UPDATE_COMPONENT_TYPE = 'UPDATE_COMPONENT_TYPE'
export const REMOVE_COMPONENT = 'REMOVE_COMPONENT'

export const addNewComponent = (data) => {
  return dispatch => {
    let newId = uuid()
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
  componentData: [{content: '', position: 1, componentType: 'Text', id: uuid()}]
}


//Accept the current state and data about old elem so we can create a new component as needed.
function addComponent(state, data){
  const {componentData} = state
  const {id} = data
  let temp = []
  let position = 1
  for(let i in componentData){
    let componentId = componentData[i].id
    if(id === componentId){
      temp.push({...componentData[i], position})
      temp.push({content: '', position: position+1, componentType: 'Text', id: data.newId})
      position += 2
    }
    else{
      temp.push({...componentData[i], position})
      position++
    }
  }

  return {componentData: temp}
}


function updateComponentTypeState(state, data){
  let {componentData} = state
  let {currentTarget, target} = data
  componentData = componentData.map(component => {
    if(component.id === currentTarget.dataset.blockId){
      return ({...component, componentType: target.dataset.type})
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
      return ({...component, ...newState})
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
    return state
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
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