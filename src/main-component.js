import React, { Component } from 'react';
import './App.css';
class App extends Component {

  componentDidMount() {
    this.nameInput.focus();
    window.addEventListener('click', e =>
    {
      e.preventDefault();
      this.nameInput.focus()
    });
  }
  
  render() {
    return (
      <div className="consolewindow">
          <span className="preconsole" id="preconsole"> username@root:~ $ </span>
          <input 
            ref={(input) => { this.nameInput = input; }} 
            placeholder="" className="textbox" id = {this.props.idname}
          />
      </div>
    );
  }
  

}

export default App;
