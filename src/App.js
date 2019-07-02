import React from 'react';
import './Components/App.css';
import {Auth} from './Components/Auth';
import {Table} from './Components/Table';
import {LoadScreen} from './Components/LoadScreen';
import {Create} from './Components/Create';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: ''};

    this.handleData = this.handleData.bind(this);
    this.getData = this.getData.bind(this);
}

componentWillMount() {
  this.getData();
}


  getData() {
      //make api call
      var url = new URL("http://localhost:8080/read")
      fetch(url, {
        method: 'GET',
      })
      .then(res => res.json())
      .then(res => this.handleData(res))
      .catch(err => err);
  }

  handleData(obj) {
    this.setState({data: obj});
  }

  render() {
    var render = this.state.data[0] ? <Table data={this.state.data} /> : <LoadScreen />
    return (
      <div>
        {render}
      </div>
    );
  }
}

export default App;
