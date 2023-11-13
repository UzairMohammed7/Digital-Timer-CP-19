import {Component} from 'react'

import './index.css'

const initialState = {
  isRunning: false,
  setTimeLimitInMinutes: 25,
  timeElapsedInSeconds: 0,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecrease = () => {
    const {setTimeLimitInMinutes} = this.state
    if (setTimeLimitInMinutes > 1) {
      this.setState(prevState => ({
        setTimeLimitInMinutes: prevState.setTimeLimitInMinutes - 1,
      }))
    }
  }

  onIncrease = () => {
    this.setState(prevState => ({
      setTimeLimitInMinutes: prevState.setTimeLimitInMinutes + 1,
    }))
  }

  onReset = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {setTimeLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === setTimeLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onClickStartOrPauseButton = () => {
    const {isRunning, timeElapsedInSeconds, setTimeLimitInMinutes} = this.state
    const isTimerCompleted = timeElapsedInSeconds === setTimeLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }

    this.setState(prevState => ({isRunning: !prevState.isRunning}))
  }

  getElapsedInSecondsInTimeFormat = () => {
    const {setTimeLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      setTimeLimitInMinutes * 60 - timeElapsedInSeconds

    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isRunning, setTimeLimitInMinutes, timeElapsedInSeconds} = this.state
    const buttonDisabled = timeElapsedInSeconds > 0

    const imgUrl = isRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altImg = isRunning ? 'pause icon' : 'play icon'
    const isStartOrPause = isRunning ? 'Pause' : 'Start'
    const isRunningOrPaused = isRunning ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1>Digital Timer</h1>
        <div className="timer-container">
          <div className="bg-img">
            <div className="time">
              <h1 className="countdown">
                {this.getElapsedInSecondsInTimeFormat()}
              </h1>
              <p className="running">{isRunningOrPaused}</p>
            </div>
          </div>
          <div className="set-timer-container">
            <div className="play-and-reset-container">
              <div className="play-and-pause-container">
                <button
                  onClick={this.onClickStartOrPauseButton}
                  className="btn"
                  type="button"
                >
                  <img className="icon" src={imgUrl} alt={altImg} />
                  <p>{isStartOrPause}</p>
                </button>
              </div>
              <div className="reset-container">
                <button onClick={this.onReset} className="btn" type="button">
                  <img
                    className="icon"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
                    alt="reset icon"
                  />
                  <p>Reset</p>
                </button>
              </div>
            </div>
            <p className="desc-set-timer">Set timer limit</p>
            <div className="set-time">
              <button
                onClick={this.onDecrease}
                disabled={buttonDisabled}
                className="btn-set"
                type="button"
              >
                -
              </button>
              <p className="set">{setTimeLimitInMinutes}</p>
              <button
                onClick={this.onIncrease}
                disabled={buttonDisabled}
                className="btn-set"
                type="button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
