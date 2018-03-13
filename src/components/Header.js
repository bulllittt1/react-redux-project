import React from 'react'
import logo from './media/logo.svg'
import './styles/Header.css'

const Header = () => {
    return(
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to my React-Redux project</h1>
      </div>
    );
}

export default Header
