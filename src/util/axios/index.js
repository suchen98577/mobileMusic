import http from './axios'

//封装接口

//封装一个轮播图接口
export function getBanner(){
    return http.get('/banner')
}

//封装一个推荐歌单的接口
export function recPlayList(params){
    return http.get('/personalized',{
        params
    })
}

//封装一个推荐歌单的接口
export function getNewSong(){
    return http.get('/personalized/newsong')
}

//封装一个推荐歌曲详情的接口
export function getSongDetail(params){
    return http.get('/song/detail',{
        params
    })
}

//封装一个推荐歌词的接口
export function getLyric(params){
    return http.get('/lyric',{
        params
    })
}

//封装一个推荐音乐url的接口
export function getSongUrl(params){
    return http.get('/song/url',{
        params
    })
}

//封装一个热歌榜的接口
export function getHotSong(){
    return http.get('/playlist/detail?id=3778678')
}

//封装一个热搜列表
export function getHots(){
    return http.get('/search/hot')
}

//封装一个推荐搜索的接口
export function getSearch(params){
    return http.get('/search',{
        params
    })
}