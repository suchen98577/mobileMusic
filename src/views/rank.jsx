import React from "react";
import "../assets/css/rank.css";
import { List } from "antd-mobile";
import "antd-mobile/lib/list/style/css";
import { getHotSong } from "../util/axios";
// import Element from "react-element";

const Item = List.Item;
const Brief = Item.Brief;
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      hotlist: [],
      img: [],
      time: "",
    };
  }

  componentDidMount() {
    getHotSong().then((res) => {
      if (res.code === 200) {
        this.setState({
          img: res.playlist,
          hotlist: res.playlist.tracks.filter((item, idx) => idx < 20),
          time: res.playlist.trackNumberUpdateTime,
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

  render() {
    const { hotlist, img, time } = this.state;
    let timer = new Date(time).toLocaleString();
    return (
      <div className="rank">
        <div className="top">
          <div className="header-items">
            <div className="header-img"></div>
            <span>更新日期:{timer}</span>
          </div>
        </div>
        <div className="list">
          <List className="my-list">
            {hotlist.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className="father"
                  onClick={this.goPlay.bind(this, item.id)}
                >
                  <span className="number">
                    {index + 1 < 10 ? "0" + (index + 1) : index + 1}
                  </span>
                  <Item
                    arrow="horizontal"
                    multipleLine
                    onClick={() => {}}
                    key={item.id}
                  >
                    {item.name}{" "}
                    <Brief>
                      {item.ar.map((i, idx) => {
                        let sep =
                          item.ar.length > 1 && idx !== item.ar.length - 1 ? (
                            <i> / </i>
                          ) : null;
                        return (
                          <span key={i.id} className="spanitem">
                            {i.name}
                            {sep}
                          </span>
                        );
                      })}
                    </Brief>
                  </Item>
                </div>
              );
            })}
          </List>
        </div>
      </div>
    );
  }
}
export default Home;
