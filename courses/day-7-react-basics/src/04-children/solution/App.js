import React from 'react'

class App extends React.Component {

  state = {
    groceries: [
      { value: 'pop corn', description: 'the good brand one', checked: false },
      { value: 'hot dogs', description: 'america fuck yeah', checked: false},
      { value: 'bud light', description: 'best beer in the world', checked: false },
    ],
  }

  handleClick = (item) => {
    const updatedItem = item
    updatedItem.checked = !item.checked
    this.setState({...this.state.groceries, updatedItem})
  }

  render() {

    const { groceries } = this.state

    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.title}</h1>
        <ul>
          {groceries.map((item) =>
            <li
              key={item.value}
              onClick={() => this.handleClick(item)}>
              <span style={{ textDecoration: item.checked ? 'line-through' : 'none', }}>
                {item.value}
              </span>
              <Collapsible visible={!item.checked}>
                {item.description}
              </Collapsible>
            </li>)
          }
        </ul>
      </div>
    )
  }
}

const Collapsible = ({children, visible}) => (
  <div hidden={!visible}>
    <i>{children}</i>
  </div>
)

export default App
