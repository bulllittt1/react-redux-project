import { combineReducers } from 'redux'
import {
  ADD_CHILD,
  REMOVE_CHILD,
  CREATE_NODE,
  DELETE_NODE,
  SET_CURRENT_ID,
  TOGGLE_SIDEBAR
 } from '../actions'
import generateTree from './generateTree'

const setCurrentId = (state = 0, action) => {
  switch (action.type) {
    case SET_CURRENT_ID:
      return action.id
    default:
      return state
  }
}

const toggleSidebar = (state = {
    SIDEBAR_ONSCREEN: false,
    BUTTON_DISABLED: false
}, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
          SIDEBAR_ONSCREEN: !state.SIDEBAR_ONSCREEN,
          BUTTON_DISABLED: !state.BUTTON_DISABLED
      }
    default:
      return state
  }
}

const childIds = (state, action) => {
  switch (action.type) {
    case ADD_CHILD:
      return [ ...state, action.childId ]
    case REMOVE_CHILD:
      return state.filter(id => id !== action.childId)
    default:
      return state
  }
}

const node = (state, action) => {
  switch (action.type) {
    case CREATE_NODE:
      return {
        id: action.nodeId,
        title: action.title,
        avatar: action.avatar,
        childIds: []
      }
    case ADD_CHILD:
    case REMOVE_CHILD:
      return {
        ...state,
        childIds: childIds(state.childIds, action)
      }
    default:
      return state
  }
}

const getAllDescendantIds = (state, nodeId) => (
  state[nodeId].childIds.reduce((acc, childId) => (
    [ ...acc, childId, ...getAllDescendantIds(state, childId) ]
  ), [])
)

const deleteMany = (state, ids) => {
  state = { ...state }
  ids.forEach(id => delete state[id])
  return state
}

const treeInit = generateTree()

const tree = (state = treeInit, action) => {
  const { nodeId } = action
  if (typeof nodeId === 'undefined') {
    return state
  }

  if (action.type === DELETE_NODE) {
    const descendantIds = getAllDescendantIds(state, nodeId)
    return deleteMany(state, [ nodeId, ...descendantIds ])
  }

  return {
    ...state,
    [nodeId]: node(state[nodeId], action)
  }
}

const rootReducer = combineReducers({
  currentId: setCurrentId,
  displayParameters:  toggleSidebar,
  tree
})

export default rootReducer
