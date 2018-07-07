import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.controlOptions = this.controlOptions.bind(this);
    this.handle = this.handle.bind(this)
  }

  componentDidMount(){
    document.addEventListener("keydown", this.controlOptions);
    document.addEventListener("keypress", this.handle);
  }

  handle(e) {
      if( e.key == 'Enter' ) {
          //submit function
          return;
      }
      this.refs.terminal.innerHTML += e.key;
  }

  controlOptions(e) {
    if( e.key == 'Backspace') {
        e.preventDefault();
        var text = this.refs.terminal.innerHTML;
        this.refs.terminal.innerHTML = text.slice(0,-1);
    }
    if( e.key == 'Tab')
        e.preventDefault();
}
  
  render() {
    return (
      <div className="consolewindow">
          <span className="preconsole"> username@root:~ $ </span>
          <span ref="terminal" contenteditable="false"> </span>
      </div>
    );
  }
  

}

export default App;
