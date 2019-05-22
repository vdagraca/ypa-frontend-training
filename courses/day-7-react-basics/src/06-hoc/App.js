import React, {Component} from 'react'

const Container = ({children}) => (<div style={{height: '100vh', width: '100vw'}}>{children}</div>)
const Title = ({children, small}) => (<h1 style={{fontSize: small ? '1rem' : '2rem'}}>{children}</h1>)

// TODO:
// create a withMousePos HOC that gives you the position of the mouse
class App extends Component {
  state = {
    x: 0,
    y: 0,
  }

  handleMouse = event => {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    })
  }

  render() {
    const {x, y} = this.state
    return (
      <Container onMouseMove={this.handleMouse}>
        <Title>
          The mouse position is ({x}, {y})
        </Title>
      </Container>
    )
  }
}

export default App
