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
      <div className="App container">
        <header className="App-header">WHALOH.COM</header>
        {!this.state.showTable ? (
          <div>
            <ComingSoonComponent
              showTable={() => this.setState({ showTable: true })}
            />
          </div>
        ) : (
          <DisplayPokedexComponent />
        )}
      </div>
    );
  }
}

export default App;
