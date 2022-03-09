import React from "react";
import ReactDom from "react-dom";
const axios = require("axios");

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      numbers: [],
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      const axiosNumbers = (await axios.get("/api/numbers")).data;
      this.setState({
        numbers: axiosNumbers,
        loading: false,
      });
    } catch (err) {
      console.log(err);
    }
  }

  // for post method
  async addNumber() {
    const newNumber = (await axios.post("/api/numbers")).data;
    const numbers = [...this.state.numbers, newNumber];
    this.setState({ numbers }); //render after adding a new number
    console.log(numbers);
  }

  //for delete
  async destroy(numberId) {
    try {
      await axios.delete(`/api/numbers/${numberId}`);
      const numbers = this.state.numbers.filter(
        (number) => number.id !== numberId
      );
      this.setState({ numbers });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    if (this.state.loading) return <h2>Loading...</h2>;
    return (
      <div>
        <button className="addNum" onClick={() => this.addNumber()}>
          Add Number
        </button>
        <ul>
          {this.state.numbers.map((number) => (
            <li key={number.id}>
              {number.name}
              <button
                onClick={() => this.destroy(number.id)}
                className="delete"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

ReactDom.render(<App />, document.querySelector("#root"));
