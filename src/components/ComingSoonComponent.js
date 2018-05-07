import React, { Component } from "react";

class ComingSoonComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dots: "•"
    };
    this.timer = "";
  }

  nextState() {
    let map = {
      "•": "••",
      "••": "•••",
      "•••": "•"
    };
    this.setState({
      dots: map[this.state.dots]
    });
  }

  componentDidMount() {
    this.timer = setInterval(this.nextState.bind(this), 1250);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div>
        <p>Coming Soon</p>
        <h1>{this.state.dots}</h1>
        <img src="/assets/whaloh_png.png" className="App-logo" alt="logo" />
        <div>
          <br />
          <a
            className="waves-effect waves-light btn"
            onClick={() => this.props.showTable()}
            href="#"
          >
            DEMO ->
          </a>
        </div>
      </div>
    );
  }
}

export default ComingSoonComponent;
