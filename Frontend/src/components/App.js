import React, { Component } from 'react'
import Header from './Header'
import Tree from '../containers/ConnectedTree'
import Sidebar from '../containers/ConnectedSidebar'
import './styles/App.css'

class App extends Component {
  componentDidMount() {
    const { fetchTreeIfNeeded } = this.props
    fetchTreeIfNeeded()
  }

  render() {
    const { sidebarOnscreen } = this.props
    return(
    <div>
      <Header />
      {sidebarOnscreen && <Sidebar /> }
      <Tree id={1} />
    </div>
    )
  }
}

export default App
