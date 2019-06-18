import uuid from 'uuid/v4'
import { sortDataOnPos } from '../../utils/helpers';
const ADD_COMPONENT = 'ADD_COMPONENT'
const UPDATE_COMPONENT = 'UPDATE_COMPONENT'
const REMOVE_COMPONENT = 'REMOVE_COMPONENT'

export const addNewComponent = (data) => {
  return ({type: ADD_COMPONENT, data})
}

export const removeComponent = (data) => {
  return ({type: REMOVE_COMPONENT, data})
}

export const updateComponent = (data) => {
  return ({type: UPDATE_COMPONENT, data})
}

const initialState = {
  componentData: [{id: uuid(), componentType: 'Text', content: '', position: 1}]
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
      temp.push({content: '', position: position+1, componentType: 'Text', id: uuid()})
      position += 2
    }
    else{
      temp.push({...componentData[i], position})
      position++
    }
  }
  
  return {componentData: temp}
}


function updateComponentState(state, data){
  
  switch(data.action){
    case 'updateComponentType':
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
    default:
  }
  
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
    case ADD_COMPONENT:
      return addComponent(state, action.data)
    case UPDATE_COMPONENT:
      return updateComponentState(state, action.data)
    case REMOVE_COMPONENT:
      return removeComponentFromState(state, action.data)
    default:
      return state
  }
}