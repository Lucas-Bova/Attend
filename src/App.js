import React from 'react';
import './Components/App.css';
import {Table} from './Components/Table';
import {LoadScreen} from './Components/LoadScreen';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: ''};

    this.handleData = this.handleData.bind(this);
    this.getData = this.getData.bind(this);
  }

  //calls the get data function when the component mounts
  componentWillMount() {
    this.getData();
  }

  //make call to local api to get all data from the DB
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
  
  //funtion to handle data by updating the component state
  handleData(obj) {
    this.setState({data: obj});
  }

  render() {
    //if data was retrieved successfully render table component else render the loadscreen component
    var render = this.state.data[0] ? <Table data={this.state.data} /> : <LoadScreen />
    return (
      <div>
        {render}
      </div>
    );
  }
}

export default App;
