import { Component } from "react";
import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

class App extends Component {
  state = {
    breakLength:5,
    sessionLength:25,

  };

  
  

  render() {
    return (
      <div className="App">
        <div className="clock">
        <div id="config">
          <div id="" class="adjust">
            <div id="break-label">Break Length</div>
            <FontAwesomeIcon id="break-increment" icon={faArrowUp} />
            <div id="break-length">{this.state.breakLength}</div>
            <FontAwesomeIcon id="break-decrement" icon={faArrowDown} />
          </div>
          <div id="" class="adjust">
          <div id="break-label">Break Length</div>
            <FontAwesomeIcon id="session-increment" icon={faArrowUp} />
            <div id="session-length">{this.state.sessionLength}</div>
            <FontAwesomeIcon id="session-decrement" icon={faArrowDown} />
          </div>
        </div>
          <div id="timer-label">Session</div>
          <div id="time-left">25:00</div>
        </div>
      </div>
    );
  }
}

export default App;
