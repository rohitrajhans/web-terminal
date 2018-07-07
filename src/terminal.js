import React, { Component } from 'react';
import './App.css';
import App from './main-component';

class Terminal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            default: [1],
            history: [],
            dir: ["Home", "About", "Contact"],
            error: false
        };
        this.submitCommands = this.submitCommands.bind(this);
        this.handle = this.handle.bind(this);
        this.processCommand = this.processCommand.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.submitCommands);
        window.addEventListener("keypress", this.handle);
    }

    handle(e) {
        document.getElementById('active').innerHTML += e.key;
    }

    submitCommands(e) {
       
        if( e.key === 'Backspace') {
            e.preventDefault();
            var text = document.getElementById('active').innerHTML;
            document.getElementById('active').innerHTML = text.slice(0,-1);
        }

        if( e.key === 'Enter' ) {
            e.preventDefault();
            let str = document.getElementById('active').innerHTML;
            this.processCommand(str);
            let number = this.state.default;
            number.push(number.length+1)
            this.setState({
                default: number,
                history: this.state.history,
                dir: this.state.dir,
                error: this.state.error
            });
        };

        if(e.key === 'Tab')
            e.preventDefault();
    }

    processCommand(str) {
        
        let history = this.state.history;
        history.push(str);

        if( history[history.length-1] === "clear" ) {
            this.setState({
                default: [],
                history: this.state.history,
                dir: this.state.dir,
                error: false
            });
        return;
        };

        if( history[history.length-1] === 'ls') {
            let newdiv = document.createElement("div")
            newdiv.innerHTML = '<span>' + this.state.dir.join(' ') + '</span>'
            document.getElementById('active').appendChild(newdiv);
            return;
        };
        
        this.setState({
            default: this.state.default,
            history: this.state.history,
            dir: this.state.dir,
            error: true
        });
    
    }

    renderError() {
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
                        else if( i === this.state.default.length-2) 
                            return(
                                <App idno={id}
                                    key={i}
                                    idname="error"
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

    render() {
        if(this.state.error)
            return this.renderError();
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