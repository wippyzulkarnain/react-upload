import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      image: null,
      users: []
    };
  }

  getData = () => {
    axios
      .get("http://localhost:3001/api/users")
      .then(res => {
        this.setState({ users: res.data.users });
      })
      .catch(err => console.error(err));
  };
  componentDidMount() {
    this.getData();
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleImageChange = e => {
    this.setState({ image: e.target.files[0] });
  };

  handleDelete = id => {
    axios
      .delete(`http://localhost:3001/api/users/${id}`)
      .then(() => this.getData())
      .catch(err => console.error(err));
  };
  handleSubmit = e => {
    const data = new FormData();
    data.append(
      "user_data",
      JSON.stringify({ name: this.state.name, email: this.state.email })
    );
    data.append("user_image", this.state.image);

    axios
      .post("http://localhost:3001/api/users", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        this.getData();
      })
      .catch(err => console.error(err));
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
          value={this.state.email}
        />
        <input type="file" name="image" onChange={this.handleImageChange} />
        <button onClick={this.handleSubmit}>Submit</button>
        {this.state.users.map((user, i) => (
          <div key={i}>
            <p>Nama gw : {user.name}</p>
            <p>Email ane : {user.email}</p>
            <img
              height="150"
              src={`https://test-upload-image-wz.s3.amazonaws.com/${
                user.image
              }`}
              alt=""
            />
            <button onClick={() => this.handleDelete(user.id)}>Delete</button>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
