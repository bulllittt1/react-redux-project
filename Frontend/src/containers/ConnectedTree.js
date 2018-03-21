import { connect } from 'react-redux'
import Tree from '../components/Tree'
import { setCurrentId, toggleSidebar, removeChild, deleteNode } from '../actions'
import { fetchAvatarIfNeeded, deleteNodeFromServer } from '../actions/serverActions'

const mapStateToProps = (state, ownProps) =>
   ({
    node: state.tree[ownProps.id],
    buttonDisabled: state.displayParameters.buttonDisabled
  })

const mapDispatchToProps = {
  setCurrentId,
  toggleSidebar,
  removeChild,
  deleteNode,
  fetchAvatarIfNeeded,
  deleteNodeFromServer
}

const ConnectedTree = connect(mapStateToProps, mapDispatchToProps)(Tree)
export default ConnectedTree
