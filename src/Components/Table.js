import React from 'react';
import './App.css';
import {Create} from './Create';
import {Delete} from './Delete';
import {Update} from './Update';
import {Charts} from './Charts';
import {Search} from './Search';

//function component that returns a row header based on recieved props
function CategoryRow(props) {
    return (
        <th>
            {props.category}
        </th>
    );
}
//function component that returns a table row
function DataRow(props) {
    var fields =[];
    for (const key in props.data) {
        fields.push(
            <td>{props.data[key]}</td>
        )
    }
    return (
        <tr>
            {fields}
        </tr>
    );
}

//table component, renders and controls all components associated with the table
export class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: this.props.data}

        this.handleData = this.handleData.bind(this);
    }

    //function to update state data with a given object
    handleData(obj) {
        this.setState({data: obj});
    }

    render() {
        var rows = [];
        var keyRows = [];
        //sets an array of key rows that will be used as table headers based on the current state data
        Object.keys(this.state.data[0]).forEach((key) => {
            keyRows.push(
                <CategoryRow category={key} />
            )
        })
        rows.push(
            <tr>
                {keyRows}
            </tr>
        )
        //sets each data row for the table based on the current state data
        this.state.data.forEach((item) => {
            rows.push(
                <DataRow data={item} />
            )
        })

        //render all components for the table
        //create update delete and search components are passed the handleData function
        //update delete and search components are passed the current state data
        return (
            <React.Fragment>
                <div class="col-3 createForm">
                    <Create handleData={this.handleData} />
                    <br />
                    <Update handleData={this.handleData} data={this.state.data} />
                    <br />
                    <Delete handleData={this.handleData} data={this.state.data} />
                    <br />
                    <Search handleData={this.handleData} data={this.state.data} />
                </div>
                <table class="col-6 table">
                    <tbody>{rows}</tbody>
                </table>
                <Charts data={this.state.data} />
            </React.Fragment>
        )
    }
}