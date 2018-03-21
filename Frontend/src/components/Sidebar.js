import React, { Component } from 'react'
import './styles/Sidebar.css'

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentFile: null,
      currentTitle: ''
    }
  }

  handleInputChange = (input) => {
      this.setState({
        currentFile: input.target.files[0]
      })
  }

  handleTitleChange = e => {
      this.setState({
        currentTitle: e.target.value
      })
  }

  handleSubmit = () => {
    const { toggleSidebar, addNodeToServer } = this.props
    const title = this.state.currentTitle
    const file = this.state.currentFile
    addNodeToServer(file, title)
    toggleSidebar()
  }

  render() {
    return (
      <div className="Sidebar">
        <h3>Create Node </h3>
        <label>
          Upload image:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange = {(input) => this.handleInputChange(input)}
        />
        <input
          type="text"
          placeholder='Enter a title'
          autoFocus
          onChange = {(e) => this.handleTitleChange(e)}
        />
        <button
          id='btn-createNode'
          onClick={this.handleSubmit}
          >
            Create new
        </button>
      </div>
    )
  }
}

export default Sidebar
