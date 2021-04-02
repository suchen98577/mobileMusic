import React from 'react'
 class Home extends React.Component{
     componentDidMount(){
         
     }
    render(){
            return (<div>
                <h1>推荐歌单列表</h1>
                <h1>接收的动态路由参数是----{this.props.match.params.id}</h1>
            </div>)
        }
}
 export default Home