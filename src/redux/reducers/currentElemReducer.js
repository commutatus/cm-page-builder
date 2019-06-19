export const SET_CURRENT_ELEM = 'SET_CURRENT_ELEM'
export const REMOVE_CURRENT_ELEM = 'REMOVE_CURRENT_ELEM'

const initialState = {
  prevSelectedElemId: null,
  elemId: null
}

export const setCurrentElem = elemId => {
  console.log(elemId)
  return ({elemId, type: SET_CURRENT_ELEM})
}

export const removeCurrentElem = () => { 
  return ({type: REMOVE_CURRENT_ELEM})
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_ELEM:
      return ({elemId: action.elemId})
    case REMOVE_CURRENT_ELEM:
      return ({elemId: null, prevSelectedElemId: state.elemId || state.prevSelectedElemId})
    default:
      return state
  }
}