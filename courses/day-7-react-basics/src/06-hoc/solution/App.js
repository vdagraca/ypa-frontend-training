import React, {Component} from 'react'

const Container = ({children}) => (<div style={{height: '100vh', width: '100vw'}}>{children}</div>)
const Title = ({children, small}) => (<h1 style={{fontSize: small ? '1rem' : '2rem'}}>{children}</h1>)

// TODO:
// create a withMousePos HOC that gives you the position of the mouse
const withMouseHOC = WrappedComponent =>
  class extends Component {
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
      return (
        <div onMouseMove={this.handleMouse}>
          <WrappedComponent x={this.state.x} y={this.state.y} />
        </div>
      )
    }
  }

class App extends Component {
  render() {
    const {x, y} = this.props
    return (
      <Container>
        <Title>
          The mouse position is ({x}, {y})
        </Title>
      </Container>
    )
  }
}

export default withMouseHOC(App)
