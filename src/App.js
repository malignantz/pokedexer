import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ComingSoonComponent from "./components/ComingSoonComponent";
import DisplayPokedexComponent from "./components/DisplayPokedexComponent";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTable: false
    };
  }

  render() {
    return (
      <div className="App" tabIndex={0}>
        <header className="App-header">WHALOH.COM</header>
        {!this.state.showTable ? (
          <div>
            <ComingSoonComponent />
            <img src="/assets/whaloh_png.png" className="App-logo" alt="logo" />
            <button onClick={() => this.setState({ showTable: true })}>
              Demo ->
            </button>
          </div>
        ) : (
          <DisplayPokedexComponent />
        )}
      </div>
    );
  }
}

export default App;
