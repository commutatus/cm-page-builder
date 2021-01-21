export const SET_CURRENT_ELEM = 'SET_CURRENT_ELEM'
export const REMOVE_CURRENT_ELEM = 'REMOVE_CURRENT_ELEM'
export const RESET = 'RESET'
export const MOVE_CARET_TO_END = 'MOVE_CARET_TO_END'
export const RESET_CARET_MANIPULATION = 'RESET_CARET_MANIPULATION'

const initialState = {
  prevSelectedElemId: null,
  elemId: null
}

export const setCurrentElem = elemId => {
  return ({elemId, type: SET_CURRENT_ELEM})
}

export const moveCaretToEnd = () => {
  return ({type: MOVE_CARET_TO_END})
}

export const resetCaretManipulation = () => {
  return ({type: RESET_CARET_MANIPULATION})
}

export const removeCurrentElem = () => { 
  return ({type: REMOVE_CURRENT_ELEM})
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_ELEM:
      return ({...state, elemId: action.elemId, prevSelectedElemId: state.elemId === action.elemId ? null : state.elemId})
    case MOVE_CARET_TO_END:
      return ({...state, shouldCaretMoveToEnd: true})
    case RESET_CARET_MANIPULATION:
      return ({...state, shouldCaretMoveToEnd: false})
    case REMOVE_CURRENT_ELEM:
      return ({elemId: null, prevSelectedElemId: state.elemId || state.prevSelectedElemId})
    case RESET:
      return initialState
    default:
      return state
  }
}