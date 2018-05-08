import React, { Component } from "react";
import { Table, AutoSizer, Column } from "react-virtualized";

import "react-virtualized/styles.css"; // only needs to be imported once

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
      //"version",
      //"image",
      "type",
      "movement",
      "rarity",
      "attacks",
      //"ability",
      "primaryType",
      "secondaryType"
    ];
    this.propWidth = {
      id: 40,
      name: 160,
      type: 160,
      movement: 20,
      rarity: 30
    };
  }

  componentWillMount() {
    this.state.data.forEach(this.addTypeProp);
    console.log(this.state.data[0]);
  }

  setFilter(key, prop = "") {
    this.handleSearch({ target: { value: `${key}:${prop}` } });
  }

  addTypeProp(fig) {
    if (fig.secondaryType !== "") {
      Object.assign(fig, { type: `${fig.primaryType} / ${fig.secondaryType}` });
    } else {
      fig.type = fig.primaryType;
    }
  }

  displayFigure(fig) {
    let result = Object.assign({}, fig);
    let upcase = val => val.toUpperCase();
    ["rarity", "type", "primaryType", "secondaryType"].forEach(prop => {
      result[prop] = upcase(result[prop]);
    });
    return result;
  }

  sort(key, compare) {
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
    if (search.includes("ytype:")) {
      search = search.replace("t", "T");
    }
    // filter search
    if (
      search.includes(":") &&
      this.figureProps.includes(search.split(":")[0]) &&
      search.split(":")[1].length > 0
    ) {
      const [keyname, prop] = search.split(":");
      let key = keyname.includes("ytype") ? rename(keyname) : keyname;
      //let key = keyname;
      // camelCase rename
      console.log("121-", key, prop);
      //console.log(key, prop);
      dat = dat.filter(fig => {
        //console.log(fig, key, prop);
        if (key === "type") {
          //console.log("126-", fig[key], prop);
          return fig[key].includes(prop);
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

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s9 whiteBg">
            <input
              type="text"
              onChange={this.handleSearch}
              value={this.state.search}
              placeholder="itar, id:420, type:rock"
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

        <div className="card">
          <div className="data_container">
            <div
              style={{
                flex: "1 1 auto",
                height: "80vh"
              }}
            >
              <AutoSizer>
                {({ height, width }) => (
                  <Table
                    disableHeader
                    rowClassName={({ index }) =>
                      index % 2 === 1 ? "zrow" : "row zebra"
                    }
                    width={width}
                    height={height}
                    headerHeight={20}
                    rowHeight={25}
                    rowCount={this.state.data.length}
                    rowGetter={({ index }) =>
                      this.displayFigure(this.state.data[index])
                    }
                    sortBy="name"
                  >
                    {this.figureProps
                      .slice(0, 6)
                      .map(prop => (
                        <Column
                          label={prop}
                          dataKey={prop}
                          width={this.propWidth[prop] || 35}
                        />
                      ))}
                  </Table>
                )}
              </AutoSizer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DisplayPokedexComponent;
