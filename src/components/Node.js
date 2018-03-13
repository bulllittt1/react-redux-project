import React, { Component }  from 'react'
import './styles/Node.css'

export class Node extends Component {
  handleAddChildClick = e => {
    e.preventDefault()

    const { id, setCurrentId, toggleSidebar } = this.props
    setCurrentId(id)
    toggleSidebar()
  }

  handleRemoveClick = e => {
    e.preventDefault()

    const { removeChild, deleteNode, parentId, id } = this.props
    removeChild(parentId, id)
    deleteNode(id)
  }

  render() {
    const { parentId, BUTTON_DISABLED } = this.props
    const { title, avatar } = this.props.node
    const deleteButton = (typeof parentId !== 'undefined') ?
    <button
      className="btn"
      disabled={BUTTON_DISABLED}
      onClick={this.handleRemoveClick} >
       {"-"}
    </button>
    :
    <button
      className="btn"
      disabled
      style={{color: "#282C34"}}  >
       {"-"}
    </button>

    return (
        <div className="Node-container" >
            <div className="Node">
              {deleteButton}
              <p> {title} </p>
              <button
                className="btn"
                disabled={BUTTON_DISABLED}
                onClick={this.handleAddChildClick}>
                {"+"}
              </button>
            </div>
          <img
            src={avatar}
            className="Node-Image"
            alt="Server error: no avatar uploaded"
          />
        </div>
    )
  }
}

export default Node
