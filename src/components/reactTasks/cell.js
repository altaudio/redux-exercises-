import React from 'react'


class Cell extends React.Component {

  constructor() {
    super()
    this.state = { pressed: true }
  }

  handleClick() {
    this.setState({ pressed: !this.state.pressed })
  }

  fontColour() {
    if (this.state.pressed) {
      return 'white'
    }
    return 'black'
  }

  buttonColour() {
    if (this.state.pressed) {
      return 'black'
    }
    return '#b3ffb3'
  }

  render() {
    return (
      <button
        style={{
          height: '150',
          width: '150',
          backgroundColor: this.buttonColour(),
          marginTop: '50',
          marginLeft: '50',
          float: 'left' }}


        onClick={() => this.handleClick()}
      >

        <p
          style={{
            color: this.fontColour(),
            fontSize: 12,
            textAlign: 'center',
            marginTop: 'auto',
            marginBottom: 'auto'
          }}
        >{this.props.text}</p>
      </button>
    )
  }
}

export default Cell
