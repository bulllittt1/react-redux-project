import React from 'react'
import Header from './Header'
import ConnectedTree from '../containers/ConnectedTree'
import ConnectedSidebar from '../containers/ConnectedSidebar'
import './styles/App.css'

const App = (props) => {
  const { SIDEBAR_ONSCREEN } = props
  return(
  <div>
    <Header />
    {SIDEBAR_ONSCREEN && <ConnectedSidebar /> }
    <ConnectedTree id={0} />
  </div>
  )
}

export default App
