import { connect } from 'react-redux'
import App from '../components/App'
import { fetchTreeIfNeeded } from '../actions/serverActions'
import { bindActionCreators } from 'redux'
 
const mapStateToProps = (state) =>
  ({ sidebarOnscreen: state.displayParameters.sidebarOnscreen})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchTreeIfNeeded }, dispatch)
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp
