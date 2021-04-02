import "./App.css";
import Index from './pages'
import Play from './pages/play'
//引入路由插件
import {Switch,Route,Redirect} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      {/* 一级路由出口 */}
      <Switch>
        <Route path='/index' component={Index}></Route>
        <Route path='/play' component={Play}></Route>
        {/* 路由重定向 */}
        <Redirect to='/index'></Redirect>
      </Switch>
    </div>
  );
}

export default App;
