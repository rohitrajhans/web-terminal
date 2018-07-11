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
        window.addEventListener("keypress", this.handle);
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
        
        
        let currentConsole = document.getElementsByClassName('consolewindow');
        currentConsole = currentConsole[currentConsole.length-1];

        let history = this.state.history;
        history.push(str);

        if( history[history.length-1] === "clear" ) {
            this.setState({
                default: [],
                history: this.state.history,
                dir: this.state.dir
            });
        return;
        };

        if( history[history.length-1] === 'ls') {
            let newdiv = document.createElement("div")
            newdiv.innerHTML = '<span>' + this.state.dir.join(' ') + '</span>'
            currentConsole.appendChild(newdiv);
            return;
        };
        
        let errordiv = document.createElement('div');
        errordiv.innerHTML = '<span> Error: Command Not Found </span>'; 
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