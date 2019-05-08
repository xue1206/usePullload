import React, { Component, useState } from 'react';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import SelectionList from './page/selection-list-test';
import IntervalTest from './page/useInetrvalTest';
import NextTransition from './page/next-transition';
import HorizontalPickerView from './swiper/horizontalPickerView';
import useInterval from './useInterval';
import useTryTillSuc from './hooks/useTryTillSuc';

function TryTillSucTest() {
  const [minute, setMinute] = useState(10);
  useInterval(() => {
    setMinute(minute-1);
  }, 1000);

  const result = useTryTillSuc(() => new Promise((res, rej) => {
    const _flag = 10*Math.random();
    _flag>8?res(_flag):rej(_flag);
  }), minute>0)
  return <div>{minute}{result}</div>
}

function TextView({data}) {
  return <p>{JSON.stringify(data)}</p>
}

class Index extends React.Component{
  state={a:1, arr:[{id:1,name:'#1'},{id:2,name:'#2'},{id:3,name:'#3'}]};
  componentWillUnmount() {
    console.log('unmount',this.state)
  }
  render(){
    console.log('app this',this);
    return (
      <div onClick={() => this.setState({a:2})}>
        shouye {this.state.a}
        <p onClick={() => {this.props.history.push('/citylist')}}>jump</p>
        {
          this.state.arr.map((data, index) => <TextView key={index} data={data}></TextView>)
        }
        <button onClick={()=>{this.setState({arr: this.state.arr.concat({id:5,name:'#5'})})}}>append child</button>
        <button onClick={()=>{this.setState({arr: [{id:5,name:'#5'}].concat(this.state.arr)})}}>insert before</button>
        <button onClick={()=>{this.setState({arr: [this.state.arr[0],...this.state.arr.slice(2)]})}}>remove second child</button>
      </div>
    )
  }
}

class App extends Component {
  state = {
    list: [...new Array(5)].map(((item, index) => 'item' + index))
  }
  render() {
    return (
      <div className="App">
      <Router>
        <Switch>
          <Route path="/tryTillSuc" component={TryTillSucTest}></Route>
          <Route path="/nextTransition" component={NextTransition}></Route>
          <Route path="/citylist" component={SelectionList}></Route>
          <Route path="/intervalTest" component={IntervalTest}></Route>
          <Route path="/horizontalPickerView" component={HorizontalPickerView}></Route>
          <Route path="/" component={Index}></Route>
          
        </Switch>
      </Router>
      </div>
    );
  }
}

export default App;
