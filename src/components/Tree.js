import React, { Component } from 'react'
import './styles/Tree.css'
import ConnectedTree from '../containers/ConnectedTree'
import Node from './Node'

export class Tree extends Component {
  renderChild = childId => {
    const { id } = this.props.node
    return (
      <li key={childId} className="item">
        <ConnectedTree id={childId} parentId={id} />
      </li>
    )
  }

  render() {
    const { childIds } = this.props.node
    return (
      <div>
        <Node {...this.props} />
        <ul className="container">
          {childIds.map(this.renderChild)}
        </ul>
      </div>
    )
  }
}

export default Tree
