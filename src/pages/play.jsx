import React from "react";
import "../assets/css/play.css";
import url1 from "../assets/images/play_needle.png";
import url2 from "../assets/images/placeholder_disk_play_song.png";
import url3 from "../assets/images/play_disc.png";
import url4 from "../assets/img/640-1.webp";
import url5 from "../assets/images/play_rdi_btn_play.png";
// import qsString from "querystring";
import jq from "jquery";
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
      bgImg: "",
      songName: "",
      singer: "",
      playTime: "00:00",
      flag: false,
    };
    this.playURL = React.createRef();
    this.audio = React.createRef();
  }
  toPlay() {
    this.setState(
      {
        flag: !this.state.flag,
      },
      () => {
        if (this.state.flag) {
          this.playURL.current.style.opacity = "1";
          this.audio.current.pause();
        } else {
          this.audio.current.play();
          this.playURL.current.style.opacity = "0";
        }
      }
    );
  }
  formateTime(timer) {
    let minutes = (Math.floor(timer / 60) + "").padStart(2, "0");
    let seconds = (Math.floor(timer % 60) + "").padStart(2, "0");
    return `${minutes}:${seconds}`;
  }
  moveLyric() {
    let active = document.getElementsByClassName("active")[0];
    let index = jq(".geci_box").children().index(active);
    let offSet = 31;
    if (active.offsetTop > offSet) {
      jq(".geci_box").css("transform", `translateY(-${index * offSet}px)`);
    }
  }
  componentDidMount() {
    getLyric({
      id: this.props.location.state.id,
    }).then((res) => {
      if (res.code === 200) {
        let lyricInfo = res.lrc.lyric;
        let reg = /\[(.*?)](.*)/g;
        let obj = {};
        lyricInfo.replace(reg, (a, b, c) => {
          b = b.slice(0, 5);
          obj[b] = c;
        });
        this.setState(
          {
            lyric: obj,
          },
          () => {
            let audio = this.audio.current;

            audio.ontimeupdate = () => {
              let nowTimer = this.formateTime(audio.currentTime);
              if (nowTimer in this.state.lyric) {
                this.setState(
                  {
                    playTime: nowTimer,
                  },
                  () => {
                    this.moveLyric();
                  }
                );
              }
            };
          }
        );
      }
    });
    getSongDetail({
      ids: this.props.location.state.id,
    }).then((res) => {
      if (res.code === 200) {
        this.setState({
          songDetail: res.songs[0],
          bgImg: res.songs[0].al.picUrl,
          songName: res.songs[0].name,
          singer: res.songs[0].ar[0].name,
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
    const {
      songDetail,
      name,
      lyric,
      songUrl,
      // arName,
      // bgImg,
      songName,
      singer,
      playTime,
      // flag
    } = this.state;

    return (
      <div className="wrapperr">
        <div id="bg" className="bg">
          <div className="bg-cover"></div>
        </div>
        <div className="titlee">
          <div className="song" id="songName">
            <img src={url4} alt="" />
            <span>你知道这首歌居然这么评论</span>
          </div>
          <div className="artist" id="artist">
            <span>打开看看</span>
          </div>
        </div>
        <div className="play-board">
          <img id="needle" className="play-needle pause-needle" src={url1} />
          <div className="disk-bg"></div>
          <div className="disk-cover disk-cover-animation">
            <img className="album" src={url2} />
            <img className="disk-border" src={url3} />
          </div>
          <div
            className="disk-cover disk-cover-animation"
            onClick={this.toPlay.bind(this)}
          >
            <img className="album" src={url2} />
            <img className="disk-border" src={url3} />
            <img
              className="disk-border aaa"
              src={songDetail.al ? songDetail.al.picUrl : ""}
            />
            <img ref={this.playURL} className="bbb" src={url5} alt="" />
          </div>
        </div>
        <div className="play_txt">
          <div className="play_txt_name">
            <span>{songName}</span>- <span className="singer">{singer}</span>
          </div>
          <div className="play_txt_geci">
            <div className="geci_box">
              {Object.entries(lyric).map((item, idx) => {
                if (playTime === item[0]) {
                  return (
                    <p className="active" key={idx}>
                      {item[1]}
                    </p>
                  );
                } else {
                  return <p key={idx}>{item[1]}</p>;
                }
              })}
            </div>
          </div>
        </div>
        <div className="footer">
          <audio ref={this.audio} src={songUrl} autoPlay></audio>
        </div>
      </div>
    );
  }
}
export default Home;
