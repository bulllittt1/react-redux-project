import { connect } from 'react-redux'
import App from '../components/App'
 
const mapStateToProps = (state) => {
  return { SIDEBAR_ONSCREEN: state.displayParameters.SIDEBAR_ONSCREEN}
}

const ConnectedApp = connect(mapStateToProps)(App)
export default ConnectedApp
