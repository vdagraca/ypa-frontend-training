import React from 'react'

class App extends React.Component {

  state = {
    groceries: [
      { value: 'pop corn', checked: false },
      { value: 'hot dogs', checked: false },
      { value: 'bud light', checked: false },
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
              style={{ textDecoration: item.checked ? 'line-through' : 'none', }}
              onClick={() => this.handleClick(item)}>
              {item.value}
            </li>)
          }
        </ul>
      </div>
    )
  }
}

export default App
