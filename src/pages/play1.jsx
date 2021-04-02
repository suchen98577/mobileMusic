import React from "react";
import "../assets/css/play.css";
import url1 from "../assets/images/play_needle.png";
import url2 from "../assets/images/placeholder_disk_play_song.png";
import url3 from "../assets/images/play_disc.png";
import { getSongDetail, getLyric, getSongUrl } from "../util/axios";
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      songDetail: {},
      name: "",
      lyric: "",
      songUrl: "",
      arName: [],
    };
  }
  componentDidMount() {
    getLyric({
      id: this.props.location.state.id,
    }).then((res) => {
      if (res.code === 200) {
        this.setState({
          lyric: res.lrc.lyric,
        });
      }
    });
    getSongDetail({
      ids: this.props.location.state.id,
    }).then((res) => {
      if (res.code === 200) {
        this.setState({
          songDetail: res.songs[0],
          name: res.songs[0].name,
          arName: res.songs[0].ar,
        });
      }
    });
    getSongUrl({
      id: this.props.location.state.id,
    }).then((res) => {
      if (res.code === 200) {
        this.setState({
          songUrl: res.data[0].url,
        });
      }
    });
  }
  render() {
    const { songDetail, name, arName, lyric, songUrl } = this.state;

    let news = lyric.replace(/\[.*?\]/g, "");
    return (
      <div className="wrapperr">
        <div id="bg" className="bg">
          <div className="bg-cover"></div>
        </div>
        <div className="titlee">
          <div className="music-info">
            <div className="song" id="songName"></div>
            <div className="artist" id="artist"></div>
          </div>
        </div>
        <div className="play-board">
          <img id="needle" className="play-needle pause-needle" src={url1} />
          <div className="disk-bg"></div>
          <div className="disk-cover disk-cover-animation">
            <img className="album" src={url2} />
            <img className="disk-border" src={url3} />
          </div>
          <div className="disk-cover disk-cover-animation">
            <img className="album" src={url2} />
            <img className="disk-border" src={url3} />
            <img
              className="disk-border aaa"
              src={songDetail.al ? songDetail.al.picUrl : ""}
            />
          </div>
        </div>
        <div className="songlists">
          <span>{news}</span>
        </div>
        <div className="footer">
          <audio src={songUrl} controls autoPlay></audio>
        </div>
      </div>
    );
  }
}
export default Home;
