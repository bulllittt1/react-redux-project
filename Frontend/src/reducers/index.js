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
import {
  REQUEST_TREE_FROM_SERVER,
  RECEIVE_TREE_FROM_SERVER,
  REQUEST_AVATAR_FROM_SERVER,
  RECEIVE_AVATAR_FROM_SERVER,
  REQUEST_SERVER,
  RESPONSE_SERVER
  } from '../actions/serverActions'


const setCurrentId = (state = 0, action) => {
  switch (action.type) {
    case SET_CURRENT_ID:
      return action.id
    default:
      return state
  }
}

const treeStatus = (state = {
  received: false,
  isFetching: false
}, action) => {
  switch (action.type) {
    case REQUEST_TREE_FROM_SERVER:
      return {
          ...state,
          isFetching: true
      }
    case RECEIVE_TREE_FROM_SERVER:
      return {
          received: true,
          isFetching: false
      }
    default:
      return state
  }
}

const serverStatus = ( state = {
  loading: false,
  lastAffectedId: 0,
  message: ''
}, action) => {
  switch (action.type) {
    case REQUEST_SERVER:
      return {
        loading: true,
        lastAffectedId: action.id,
        message: action.message
      }
    case RESPONSE_SERVER:
      return {
        loading: false,
        lastAffectedId: action.id,
        message: action.message
      }
    default:
      return state
  }
}

const toggleSidebar = (state = {
    sidebarOnscreen: false,
    buttonDisabled: false
}, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
          sidebarOnscreen: !state.sidebarOnscreen,
          buttonDisabled: !state.buttonDisabled
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
        childIds: []
      }
    case ADD_CHILD:
    case REMOVE_CHILD:
      return {
        ...state,
        childIds: childIds(state.childIds, action)
      }
    case REQUEST_AVATAR_FROM_SERVER:
      return {
        ...state,
        avatarIsFetching: true
      }
    case RECEIVE_AVATAR_FROM_SERVER:
      return {
        ...state,
        avatar: action.avatar,
        avatarIsFetching: false
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
  if (typeof nodeId !== 'undefined') {
    return {
      ...state,
      [nodeId]: node(state[nodeId], action)
    }
  }

  switch (action.type) {
    case DELETE_NODE:
      const descendantIds = getAllDescendantIds(state, nodeId)
      return deleteMany(state, [ nodeId, ...descendantIds ])
    case RECEIVE_TREE_FROM_SERVER:
      return Object.assign({}, action.nodes, {1: {...action.nodes[1], avatar: state[1].avatar}})
    default:
      return state
  }
}

const rootReducer = combineReducers({
  currentId: setCurrentId,
  displayParameters:  toggleSidebar,
  tree,
  treeStatus,
  serverStatus
})

export default rootReducer
