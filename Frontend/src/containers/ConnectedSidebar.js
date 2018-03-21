import { connect } from 'react-redux'
import { toggleSidebar } from '../actions'
import Sidebar from '../components/Sidebar'
import { addNodeToServer } from '../actions/serverActions'

const mapStateToProps = (state) => {
  return {currentId: state.currentId}
}
const mapDispatchToProps = {
  toggleSidebar,
  addNodeToServer
}

const ConnectedSidebar = connect(mapStateToProps, mapDispatchToProps)(Sidebar)
export default ConnectedSidebar
