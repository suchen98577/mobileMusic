import React from "react";
import "../assets/css/recommend.css";
import http from "../util/axios/axios";
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      sonSheets: [],
      newSong: [],
    };
  }
  componentDidMount() {
    http.get("/personalized?limit=6").then((res) => {
      this.setState({
        sonSheets: res.result,
      });
    });
    http.get("/personalized/newsong").then((res) => {
      this.setState({
        newSong: res.result,
      });
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
    return (
      <div className="recommend">
        <div className="wrapper">
          <h2>推荐歌单</h2>
          <div className="sheetlist">
            {this.state.sonSheets.map((item) => {
              return (
                <div className="sheetlistitem" key={item.id}>
                  <img src={item.picUrl} alt="" />
                  <p className="title">{item.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/*最新音乐 */}
        <div className="wrapper">
          <h2>最新音乐</h2>
          <div className="songlist">
            {this.state.newSong.map((item) => {
              return (
                <div className="songitem" key={item.id}>
                  <div
                    className="left"
                    onClick={this.goPlay.bind(this, item.id)}
                  >
                    <div className="song">{item.name}</div>
                    <div className="singer">
                      {item.song.artists.map((i, idx) => {
                        let sep =
                          item.song.artists.length > 1 &&
                          idx !== item.song.artists.length - 1 ? (
                            <i> / </i>
                          ) : null;
                        return (
                          <span key={i.id}>
                            {i.name}
                            {sep}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div className="right">
                    <span></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
