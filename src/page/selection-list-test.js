import React, { Component } from 'react';
import SelectionList from '../betterScroll/SelectionList';

class App extends Component {
  state = {
    list: [...new Array(5)].map(((item, index) => 'item' + index))
  }
  render() {
    return (
      <div className="App">
        <SelectionList></SelectionList>
      </div>
    );
  }
}

export default App;
