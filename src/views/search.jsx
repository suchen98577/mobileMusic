import React from "react";
import { SearchBar } from "antd-mobile";
import "antd-mobile/lib/search-bar/style/css";
import "../assets/css/search.css";
import { getSearch } from "../util/axios";
import { getHots } from "../util/axios";
import { Icon } from "antd-mobile";
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      hotsList: [],
      resultList: [],
    };
  }
  componentDidMount() {
    getHots().then((res) => {
      if (res.code === 200) {
        this.setState({
          hotsList: res.result.hots,
        });
      }
    });
  }
  goPlay(id) {
    this.props.history.push({
      pathname: "/play",
      state: {
        id,
      },
    });
  }
  search(value) {
    this.onChange(value);
    if (value.length === 0) {
      this.setState({
        resultList: [],
      });
    }
  }
  onChange(value) {
    this.setState({ value });
    getSearch({
      limit: 10,
      keywords: value,
    }).then((res) => {
      if (res.code === 200) {
        this.setState({
          resultList: res.result.songs,
        });
      }
    });
    if (!value) {
      this.setState({
        resultList: [],
      });
    }
  }

  render() {
    const { hotsList, resultList } = this.state;

    let hotInfo = (
      <ul className="list">
        <h3>热门搜索</h3>
        {hotsList.map((item) => {
          return (
            <li
              className="hots"
              key={item.first}
              onClick={this.search.bind(this, item.first)}
            >
              {item.first}
            </li>
          );
        })}
      </ul>
    );
    let searchInfo = (
      <ul className="sosuo">
        <h3>搜索"{this.state.value}"</h3>

        {resultList.map((item) => {
          return (
            <li key={item.id} onClick={this.goPlay.bind(this, item.id)}>
              <i>
                {" "}
                <Icon type="search" />
              </i>
              {item.name}
            </li>
          );
        })}
      </ul>
    );
    return (
      <div className="search">
        <SearchBar
          value={this.state.value}
          placeholder="搜索歌曲、歌手、专辑"
          cancelText
          onChange={this.onChange.bind(this)}
        />

        <div className="hot">
          {resultList.length > 0 ? searchInfo : hotInfo}
        </div>
      </div>
    );
  }
}

export default Home;
