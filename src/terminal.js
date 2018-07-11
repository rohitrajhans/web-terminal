import React, { Component } from 'react';
import './App.css';
import App from './main-component';

class Terminal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            default: [1],
            history: [],
            dir: ["Home", "About", "Contact"]
        };
        this.submitCommands = this.submitCommands.bind(this);
        this.processCommand = this.processCommand.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.submitCommands);
    }

    submitCommands(e) {

        if( e.key === 'Enter' ) {
            e.preventDefault();
            let str = document.getElementById('active').value;
            this.processCommand(str);
            let number = this.state.default;
            number.push(number.length+1)
            this.setState({
                default: number,
                history: this.state.history,
                dir: this.state.dir
            });
        };

        if(e.key === 'Tab')
            e.preventDefault();
    }

    processCommand(str) {

        // console.log(str);
        let command = str.split(' ');
        // console.log(command);
        
        let currentConsole = document.getElementsByClassName('consolewindow');
        currentConsole = currentConsole[currentConsole.length-1];

        let history = this.state.history;
        history.push(str);

        if( command[0] === "clear" ) {
            if(command.length === 1 ){
                this.setState({
                    default: [],
                    history: this.state.history,
                    dir: this.state.dir
                });
            return;
            };
        };

        if( command[0] === 'ls') {
            if(command.length === 1) {
                let newdiv = document.createElement("div")
                for( var i in this.state.dir) {
                    newdiv.innerHTML += '<span class="displayText">' + this.state.dir[i] + '</span>';
                }
                currentConsole.appendChild(newdiv);
                return;
            }
        };

        if( command[0] === 'cd' ) { 
            // to get director name
            for ( var dir in this.state.dir) {
                if(command[1] === this.state.dir[dir]) {
                    let currenturl = window.location.href;
                    window.location = currenturl + 'page' + dir + '.html';
                    return;
                }
            }
            // if none of the directories match
            let newdiv = document.createElement("div");
            newdiv.className += 'errorText';
            newdiv.innerHTML = "<span> Error: no such directory - '" + command[1] + "'</span>";
            currentConsole.appendChild(newdiv); 
            return;
        }

        if( command[0] === 'help') {
            if( command.length === 1 ) {
                let newdiv = document.createElement("div");
                newdiv.className += 'displayText';
                newdiv.innerHTML += 
                    '<div> <span>cd <i>pagename</i> </span>  : Switch to different page  </div>' + 
                    '<div> <span>ls</span> : Lists all the pages </div>' + 
                    '<div> <span>clear</span> : Clears current screen </div>';
                currentConsole.appendChild(newdiv);
                return; 
            }
        }

        // if none of the commands match display error message
        let errordiv = document.createElement('div');
        errordiv.innerHTML = '<span> Error: Command not found </span>'; 
        errordiv.className += 'errorText';
        currentConsole.appendChild(errordiv);
    
    }

    render() {
        return(
            <div className="terminalBox">
                {
                    this.state.default.map( (id,i) => {
                        if(i === this.state.default.length-1)
                            return (
                                <App idno={id}
                                    key = {i}
                                    idname = "active"
                                />
                            )
                        else return(
                            <App idno={id}
                                key={i}
                                idname="inactive" 
                            />
                    )})
                }
            </div>
        )
    }
}

export default Terminal