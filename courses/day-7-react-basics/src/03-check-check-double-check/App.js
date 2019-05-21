import React from 'react'

// TODO add some state to check off items off our list
// psst, use this lil array structure
// groceries: [
//   { value: 'coca cola', checked: false },
// ]

class App extends React.Component {

  render() {

    return (
      <div className="shopping-list">
        <h1>Shopping List for someone </h1>

        {/* maybe use a loop ¯\_(ツ)_/¯ */}
        <ul>
          <li>eggs</li>
          <li>bread</li>
          <li>butter</li>
        </ul>
      </div>
    )
  }
}

export default App
