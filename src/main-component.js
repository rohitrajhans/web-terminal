import React, { Component } from 'react';
import './App.css';
class App extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    if(this.props.idname === 'error') {
      return (
        <div className="consolewindow">
            <span className="preconsole" id="preconsole"> username@root:~ $ </span>
            <span ref="terminal" id={this.props.idname} contenteditable="false"></span>
            <div className="errorText"><span> Error: Command not found </span></div>
        </div>
      );
    }
    return (
      <div className="consolewindow">
          <span className="preconsole" id="preconsole"> username@root:~ $ </span>
          <span ref="terminal" id={this.props.idname} contenteditable="false"></span>
      </div>
    );
  }
  

}

export default App;
