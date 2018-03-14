import paginate from './paginate'
import { createNode, addChild} from './'

export const REQUEST_TREE_FROM_SERVER = 'REQUEST_TREE_FROM_SERVER'
export const RECEIVE_TREE_FROM_SERVER = 'RECEIVE_TREE_FROM_SERVER'

export const REQUEST_AVATAR_FROM_SERVER = 'REQUEST_AVATAR_FROM_SERVER'
export const RECEIVE_AVATAR_FROM_SERVER = 'RECEIVE_AVATAR_FROM_SERVER'

export const REQUEST_SERVER = 'REQUEST_SERVER'
export const RESPONSE_SERVER = 'RESPONSE_SERVER'

const requestTree = () => {
    return ({
      type: REQUEST_TREE_FROM_SERVER,
    })
}

const receiveTree = (data) => {
  return ({
  type: RECEIVE_TREE_FROM_SERVER,
  nodes: data
})
}

const fetchTree = () => dispatch => {
  dispatch(requestTree())
  return fetch('http://localhost:8080/getTree')
    .then(response => response.json())
    .then(json => paginate(json))
    .then(result => dispatch(receiveTree(result)))
}

export const fetchTreeIfNeeded = () => (dispatch, getState) => {
  if (!getState().treeStatus.received || !getState().treeStatus.isFetching) {
    return dispatch(fetchTree())
  }
}

const requestAvatar = (id) => ({
      type: REQUEST_AVATAR_FROM_SERVER,
      nodeId: id
    })

const receiveAvatar = (id, avatar) => ({
  type: RECEIVE_AVATAR_FROM_SERVER,
  nodeId: id,
  avatar
})

const fetchAvatar = (id) => dispatch => {
  dispatch(requestAvatar(id))
  return fetch("http://localhost:8080/getAvatar/ID=" + id)
    .then(res => res.blob())
    .then(result => dispatch(receiveAvatar(id, URL.createObjectURL(result))))
}

export const fetchAvatarIfNeeded = (id) => (dispatch, getState) => {
  if (!getState().tree[id].avatarIsFetching || getState().tree[id] === '') {
    return dispatch(fetchAvatar(id))
  }
}

const requestServer = (id, message) => ({
      type: REQUEST_SERVER,
      id,
      message
    })

const responseServer = (id, message) => ({
  type: RESPONSE_SERVER,
  id,
  message
})

export const addNodeToServer = (file, title) => (dispatch, getState) => {
  const parentId = getState().currentId
  dispatch(requestServer(parentId, "Add New Node"))

  // Send data to Backend within formdata.
  let data = new FormData()

  // Check if avatar was uploaded and inform Backend about it.
  if (file != null) {
      data.append('filestatus', 'true')
  } else {
      data.append('filestatus', 'false')
  }
  data.append('uploadfile', file)
  const jsonData = JSON.stringify({
      ParentID: parentId,
      Title: title
  })
  data.append('jsonData', jsonData)

  return  fetch('http://localhost:8080/addNode', {
            method: 'POST',
            body: data
          })
          .then(res => res.json())
          .then(
            (result) => {
              dispatch(responseServer(result.id, "New Child Added"))
              dispatch(createNode(result.id, result.title))
              dispatch(addChild(parentId, result.id))
            }
          )
}

export const deleteNodeFromServer = (id) => dispatch => {
  dispatch(requestServer(id, "Delete Node"))
  return fetch("http://localhost:8080/deleteNode/ID=" + id)
    .then(result => {
            dispatch(responseServer(id, "Node deleted"))

    }
    )
}
