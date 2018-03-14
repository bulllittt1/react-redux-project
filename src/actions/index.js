export const CREATE_NODE = 'CREATE_NODE'
export const DELETE_NODE = 'DELETE_NODE'
export const ADD_CHILD = 'ADD_CHILD'
export const REMOVE_CHILD = 'REMOVE_CHILD'
export const SET_CURRENT_ID = 'SET_CURRENT_ID'
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'

export const createNode = (id, title) => ({
    type: CREATE_NODE,
    nodeId: id,
    title,
  })

export const deleteNode = (nodeId) => ({
  type: DELETE_NODE,
  nodeId
})

export const addChild = (nodeId, childId) => ({
  type: ADD_CHILD,
  nodeId,
  childId
})

export const removeChild = (nodeId, childId) => ({
  type: REMOVE_CHILD,
  nodeId,
  childId
})

export const setCurrentId = (id) => ({
  type: SET_CURRENT_ID,
  id
})

export const toggleSidebar = () => ({
 type: TOGGLE_SIDEBAR
})
