import React, { Component } from 'react';
import './App.css';
import Pullload from './betterScroll';

class App extends Component {
  state = {
    list: [...new Array(5)].map(((item, index) => 'item' + index))
  }
  render() {
    return (
      <div className="App">
        <Pullload pullDownHandler={() => {
          return new Promise((res, rej)=>{
            setTimeout(() => {
              this.setState({
                list: this.state.list.concat('item'+new Date().getMinutes())
              })
              res();
            },2000);
          })
          
        }}>
          
            {
              this.state.list.map(item => 
                <div>{item}</div>  
              )
            }
        
        </Pullload>
      </div>
    );
  }
}

export default App;
