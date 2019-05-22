import React, {Component} from 'react'

const Container = ({children}) => (<div>{children}</div>)
const Title = ({children, small}) => (<h1 style={{fontSize: small ? '1rem' : '2rem'}}>{children}</h1>)

// By only changing the code of the component ComponentsCounter
// get to the following result: https://i.imgur.com/aJQxZNy.png
const ComponentsCounter = ({children}) => (
  <Container>
    <Title>
      You passed {React.Children.count(children)} element{React.Children.count(
      children
    ) > 1
      ? 's'
      : ''}
    </Title>
    {React.Children.map(children, (el, index) =>
      React.cloneElement(el, {
        index,
      })
    )}
  </Container>
)

const Element = ({index}) => <Title small>Im the element number {index}</Title>

class App extends Component {

  render() {
    return (
      <ComponentsCounter>
        <Element />
        <Element />
        <Element />
        <Element />
        <Element />
        <Element />
      </ComponentsCounter>
    )
  }
}

export default App
