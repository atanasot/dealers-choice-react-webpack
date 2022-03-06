//console.log('hello world') //this code we should see in the browser
// we actually run the dist/main.js in the server because its compiled into JS

import React from 'react'
import ReactDom from 'react-dom'

class App extends React.Component {
    constructor() {
        super()
        console.log('in constructor!')
    }
    render() {
        return (
            <div>
                <p>Hey</p>
            </div>
        )
    }
}

ReactDom.render(<App />, document.querySelector('#root'))