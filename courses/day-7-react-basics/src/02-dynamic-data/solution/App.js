import React from 'react'

const App = (props) => (
  <div className="shopping-list">
    <h1>Shopping List for {props.title}</h1>
    <ul>
      <li>eggs</li>
      <li>bread</li>
      <li>butter</li>
    </ul>
  </div>
)

export default App
