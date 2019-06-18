export const SET_CURRENT_ELEM = 'SET_CURRENT_ELEM'
export const REMOVE_CURRENT_ELEM = 'REMOVE_CURRENT_ELEM'

const initialState = {
  prevSelectedElem: null,
  elem: null
}

export const setCurrentElem = elem => {
  return ({elem, type: SET_CURRENT_ELEM})
}

export const removeCurrentElem = () => { 
  return ({type: REMOVE_CURRENT_ELEM})
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_ELEM:
      return ({elem: action.elem})
    case REMOVE_CURRENT_ELEM:
      return ({elem: null, prevSelectedElem: state.elem || state.prevSelectedElem})
    default:
      return state
  }
}