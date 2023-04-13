import React, { Component } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import Play from "./components/play";
import Pause from "./components/pause";
import Reset from "./components/reset";

class App extends Component {
  constructor() {
    super();

    this.state = {
      timeLeft: "25:00",
      breakLength: 5,
      sessionLength: 25,
      play: false,
      timerLabel: "Session",
    };

    this.audioRef = React.createRef();
  }

  handlePlayButton() {
    this.setState(
      (prevState) => ({
        play: !prevState.play,
      }),
      () => {
        if (this.state.play) {
          this.timer = setInterval(() => {
            this.setState((prevState) => ({
              timeLeft: this.decrementTime(prevState.timeLeft),
            }));
          }, 1000);
        } else {
          clearInterval(this.timer);
          this.handleStopAudio()
        }
      }
    );
  }

  decrementTime(time) {
    let [minutes, seconds] = time.split(":");
    let totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);
    totalSeconds -= 1; // Decrement time by 1 second
    if (totalSeconds < 0) {
      // Stop the timer when the time reaches zero
      totalSeconds = 0;
    }
    let newMinutes = Math.floor(totalSeconds / 60);
    let newSeconds = totalSeconds % 60;
    newMinutes = newMinutes < 10 ? "0" + newMinutes : newMinutes;
    newSeconds = newSeconds < 10 ? "0" + newSeconds : newSeconds;

    return `${newMinutes}:${newSeconds}`;
  }

  handleReset() {
    this.setState(
      {
        breakLength: 5,
        sessionLength: 25,
        timeLeft: "25:00",
      },
      () => {
        this.handleStopAudio();
      }
    );
  }

  handleBreak(action) {
    this.setState((prevState) => ({
      breakLength: action === "increment" ? prevState.breakLength + 1 : prevState.breakLength - 1,
    }));
  }

  handleSession(action) {
    this.setState(
      (prevState) => ({
        sessionLength: action === "increment" ? prevState.sessionLength + 1 : prevState.sessionLength - 1,
      }),
      () => {
        this.setState({
          timeLeft: `${this.state.sessionLength.toString().padStart(2, "0")}:00`,
        });
      }
    );
  }

  handlePlayAudio() {
    this.audioRef.current.play();
  }

  handleStopAudio() {
    this.audioRef.current.pause();
  }

  componentDidUpdate() {
    if (this.state.sessionLength < 1) {
      this.setState({
        sessionLength: 1,
      });
    }

    if (this.state.sessionLength === 61) {
      this.setState({
        sessionLength: 60,
      });
    }

    if (this.state.breakLength < 1) {
      this.setState({
        breakLength: 1,
      });
    }

    if (this.state.breakLength === 61) {
      this.setState({
        breakLength: 60,
      });
    }

    if (this.state.timeLeft === "00:00" && this.state.timerLabel === "Session") {
      setTimeout(
        this.setState(
          {
            timeLeft: `${this.state.breakLength.toString().padStart(2, "0")}:00`,
            timerLabel: "Break",
          },
          () => {
            this.handlePlayAudio();
          }
        ),
        1000
      );
    }

    if (this.state.timeLeft === "00:00" && this.state.timerLabel === "Break") {
      setTimeout(
        this.setState(
          {
            timeLeft: `${this.state.sessionLength.toString().padStart(2, "0")}:00`,
            timerLabel: "Session",
          },
          () => {
            this.handlePlayAudio();
          }
        ),
        1000
      );
    }
  }

  render() {
    return (
      <div className="App">
        <audio src={process.env.PUBLIC_URL + "/alarm.mp3"} ref={this.audioRef} id="beep" />
        <h1>Pomodoro Clock</h1>
        <div className="clock">
          <div id="config">
            <div id="" className="adjust">
              <div id="break-label">Break Length</div>
              <button id="break-increment" onClick={() => (!this.state.play && this.state.breakLength !== 60 ? this.handleBreak("increment") : null)}><FontAwesomeIcon icon={faArrowUp}  /></button>
              <div id="break-length">{this.state.breakLength}</div>
              <button id="break-decrement" onClick={() => (!this.state.play && this.state.breakLength > 1 ? this.handleBreak("decrement") : null)}><FontAwesomeIcon  icon={faArrowDown}  /></button>
            </div>
            <div id="" className="adjust">
              <div id="session-label">Session Length</div>
              <button id="session-increment" onClick={() => (!this.state.play && this.state.sessionLength !== 60 ? this.handleSession("increment") : null)} > <FontAwesomeIcon icon={faArrowUp}/></button>
              <div id="session-length">{this.state.sessionLength}</div>
              <button id="session-decrement" onClick={() => (!this.state.play && this.state.sessionLength > 1 ? this.handleSession("decrement") : null)} ><FontAwesomeIcon  icon={faArrowDown}/></button>
            </div>
          </div>
          <div id="timer-label">{this.state.timerLabel}</div>
          <div id="time-left">{this.state.timeLeft}</div>

          <div id="config">
            <div id="start_stop">{this.state.play === true ? <Pause onClick={() => this.handlePlayButton()} /> : <Play onClick={() => this.handlePlayButton()} />}</div>
            <div>
              <div id="reset"><Reset onClick={() => this.handleReset()} /></div>
              <div id="whatever" onClick={() => this.setState({timeLeft:"00:05"})} >Play 5 seconds</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
