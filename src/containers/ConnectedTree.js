import { connect } from 'react-redux'
import Tree from '../components/Tree'
import { setCurrentId, toggleSidebar, removeChild, deleteNode } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    node: state.tree[ownProps.id],
    BUTTON_DISABLED: state.displayParameters.BUTTON_DISABLED
  }
}
const mapDispatchToProps = {
  setCurrentId,
  toggleSidebar,
  removeChild,
  deleteNode
}

const ConnectedTree = connect(mapStateToProps, mapDispatchToProps)(Tree)
export default ConnectedTree
