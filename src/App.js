import React, { Component } from 'react';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import SelectionList from './page/selection-list-test';
import IntervalTest from './page/useInetrvalTest';
import NextTransition from './page/next-transition';
import HorizontalPickerView from './swiper/horizontalPickerView';

class Index extends React.Component{
  state={a:1};
  componentWillUnmount() {
    console.log('unmount',this.state)
  }
  render(){
    console.log('app this',this);
    return (
      <div onClick={() => this.setState({a:2})}>
        shouye {this.state.a}
        <p onClick={() => {this.props.history.push('/citylist')}}>jump</p>
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
