import { connect } from 'react-redux'
import { createNode, addChild, toggleSidebar} from '../actions'
import Sidebar from '../components/Sidebar'

const mapStateToProps = (state) => {
  return {currentId: state.currentId}
}
const mapDispatchToProps = {
  createNode,
  addChild,
  toggleSidebar
}

const ConnectedSidebar = connect(mapStateToProps, mapDispatchToProps)(Sidebar)
export default ConnectedSidebar
