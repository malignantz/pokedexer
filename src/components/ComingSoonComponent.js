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
      </div>
    );
  }
}

export default ComingSoonComponent;
