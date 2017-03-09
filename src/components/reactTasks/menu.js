import React from 'react'

class Menu extends React.Component {
  constructor() {
    super()

    // Set state with menuOpen, menu height and menu text
    this.state = { menuOpen: false, menuHeight: 40, menuControl: '+' }
  }

  menuClick() {
    // Set menuOpen to !menuOpen
    this.state.menuOpen = !this.state.menuOpen

    if (this.state.menuOpen) {
      // if menuOpen, expand menu and change title
      this.setState({ menuControl: '-', menuHeight: 100 })
    } else {
      // if menuOpen false, retract menu and change title
      this.setState({ menuControl: '+', menuHeight: 40 })
    }
  }

  render() {
    return (
        // set div styles, dynamic height set by state.menuHeight
        // On click, call menuClick method
        // Set menu title from state
        // Menu links,shown or hidden if menuOpen true/false
      <div
        style={{
          height: this.state.menuHeight,
          backgroundColor: 'black',
          textAlign: 'center',
          color: 'white',
          fontSize: '20px' }}
      >

        <p hidden={!this.state.menuOpen}>Grand Designs Bingo</p>
        <a href="http://localhost:3000/reactTasks#" hidden={!this.state.menuOpen}>Home</a>
        <a href="http://localhost:3000/reactTasks#" hidden={!this.state.menuOpen}>Blog</a>
        <a href="http://localhost:3000/reactTasks#" hidden={!this.state.menuOpen}>Contact</a>

        <a
          href="http://localhost:3000/reactTasks#"
          style={{
            fontWeight: 'bold',
            color: 'white',
            fontSize: '30px',
            textDecoration: 'none',
            display: 'block' }}

          onClick={() => this.menuClick()}
        >{this.state.menuControl}
        </a>

      </div>
    )
  }

}

export default Menu

