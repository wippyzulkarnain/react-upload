import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      image: null
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleImageChange = e => {
    this.setState({ image: e.target.files[0] });
  };
  handleSubmit = e => {
    const data = new FormData();
    data.append(
      "user.data",
      JSON.stringify({ name: this.state.name, email: this.state.email })
    );
    data.append("user.image",this.state.image)
  };
  render() {
    return (
      <div>
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.state.name}
        />
        <input
          type="email"
          name="email"
          onChange={this.handleChange}
          value={this.state.name}
        />
        <input type="file" name="image" onChange={this.handleImageChange} />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

export default App;
