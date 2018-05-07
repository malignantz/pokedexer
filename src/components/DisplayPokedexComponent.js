import React, { Component } from "react";
import data from "./../pokedex.v0.3";
import "./DisplayPokedexComponent.css";

class DisplayPokedexComponent extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.trimBoth = val => val.trimLeft().trim();

    this.state = {
      search: "",
      data: data.figures
    };
    this.figureProps = [
      "id",
      "name",
      "version",
      "image",
      "type",
      "attacks",
      "ability",
      "movement",
      "rarity"
    ];
  }

  setFilter(key, prop = "") {
    this.handleSearch({ target: { value: `${key}:${prop}` } });
  }

  sort(key, compare) {
    if (key.includes("T")) {
      key = key.replace("T", "t");
    }

    if (compare) {
      let sorted = this.state.data.sort(compare).slice(0);
      this.setState({ data: sorted });
    } else {
      //console.log("Sorting with key: ", key);

      let sorted1 = this.state.data.slice(0).sort((a, b) => {
        //console.log(`${a === undefined || b === undefined}`);
        if (key === "id") {
          return a.id - b.id;
        }
        if (a === undefined && b === undefined) {
          return 0;
        }
        if (a[key] === undefined && b[key] === undefined) {
          return 0;
        }
        if (a[key] && b[key] === undefined) {
          return 1;
        }
        if (b[key] && a[key] === undefined) {
          return -1;
        }
        if (a[key] === b[key]) {
          return parseInt(a.id) < parseInt(b.id) ? 1 : -1;
        }
        //console.log(a[key], b[key]);
        return a[key] > b[key] ? 1 : -1;
      });
      /*
      let sorted1 = this.state.data
        .sort(
          (a, b) =>
            a[key] === undefined
              ? -1
              : b[key] === undefined
                ? 1
                : a[key] > b[key]
                  ? 1
                  : a[key] === b[key]
                    ? a.id > b.id
                      ? 1
                      : -1
                    : -1
        )
        .slice(0);
*/
      this.setState({ data: sorted1 });
    }
  }

  makeThead(headers) {
    return headers.map(header => (
      <th onClick={() => this.sort(header)} key={header}>
        {header}
      </th>
    ));
  }

  handleSearch(e) {
    if (e === "") {
      this.setState({ search: "", data: data.figures });
      return;
    }
    let search = e.target.value.toLowerCase();
    let dat = data.figures.slice(0);
    let rename = item => item.replace("t", "T");
    //console.log(dat.length);
    //if (this.figureProps.includes(search)) return;

    // filter search
    if (
      search.includes(":") &&
      this.figureProps.includes(search.split(":")[0]) &&
      search.split(":")[1].length > 0
    ) {
      const [keyname, prop] = search.split(":");
      //let key = keyname.includes("type") ? rename(keyname) : keyname;
      let key = keyname;
      // camelCase rename

      //console.log(key, prop);
      dat = dat.filter(fig => {
        //console.log(fig, key, prop);
        if (key === "type") {
          if (fig.type.includes("/")) {
            const [prim, sec] = fig.type.split("/").map(this.trimBoth);
            let prop1 = prop.toUpperCase();
            return prim === prop1 || sec === prop1;
          }
        }
        return key in fig ? fig[key].toLowerCase() === prop : false;
      });
    } else {
      // flexible search
      dat = search.includes(":")
        ? dat
        : dat.filter(fig => {
            for (var prop in fig) {
              if (fig[prop].toLowerCase().includes(search)) {
                return true;
              }
            }
            return false;
          });
    }
    this.setState({ search, data: dat });
  }

  makeTds(fig) {
    if (fig.secondaryType) {
      Object.assign(fig, {
        type: `${fig.primaryType.toUpperCase()} / ${fig.secondaryType.toUpperCase()}`
      });
    } else {
      Object.assign(fig, { type: fig.primaryType.toUpperCase() });
    }
    var filterTypes = ["movement", "rarity", "ability"];

    var tds = ["id", "name", "type", "movement", "rarity"].map(
      prop =>
        filterTypes.includes(prop) ? (
          <td
            key={prop}
            className="clickable"
            onClick={() => this.setFilter(prop, fig[prop])}
          >
            {prop === "rarity" ? fig[prop].toUpperCase() : fig[prop]}
          </td>
        ) : (
          <td key={prop}>{fig[prop]}</td>
        )
    );
    return tds;
  }

  render() {
    //console.log(data.figures.map(fig => fig.id).join(""));
    //this.makeRow = this.makeRowMaker();

    return (
      <div>
        <div className="row">
          <div className="col s1">
            <i className="material-icons">search</i>
          </div>
          <div className="col s8">
            <input
              type="text"
              onChange={this.handleSearch}
              value={this.state.search}
              placeholder="Search or click a box to filter"
              tabIndex="0"
            />
          </div>
          <div className="col s2">
            <a
              className="waves-effect waves-light btn"
              onClick={() => this.handleSearch("")}
              tabIndex="1"
            >
              Reset
            </a>
          </div>
        </div>
        <table>
          <tbody>
            {this.state.data.map(fig => (
              <tr key={fig.id + fig.name}>{this.makeTds(fig)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DisplayPokedexComponent;
