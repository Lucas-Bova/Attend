import React from 'react';
import './App.css';
import {Create} from './Create';
import {Delete} from './Delete';
import {Update} from './Update';
import {VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryPie} from 'victory';
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
        this.getTicks = this.getTicks.bind(this);
        this.calcDisplayData = this.calcDisplayData.bind(this);
    }

    //function to update state data with a given object
    handleData(obj) {
        this.setState({data: obj});
    }

    //funtion that returns data for a chart based on a provided key
    //reads the current data state and interprets a subset of that data to be used for charts
    //for the data array, the x key value corresponds to the provided key parameter, the y key value is the count of how many x key matches have been found
    calcDisplayData(key) {
        var Data = []
        //iterates through state data
        //if the current item is the first item a data object is added to the array
        //each item in the data array is compared to the current item to determine if the key values match
        //if the items match the count of the data array object is incremented and the found item flag is set to true
        //if the found item flag is not true, a new data object is added to the data array with a count of 1
        this.state.data.forEach((item) => {
            var foundItem = false;
            if (Data.length == 0) {
                Data.push({x: item[key], y: 0})
            }
            for (var i = 0; i < Data.length; i++) {
                if (Data[i].x === item[key]) {
                    Data[i].y++;
                    foundItem = true;
                }
            }
            if (!foundItem) {
                Data.push({x: item[key], y: 1})
            }
        })
        //data array is sorted so it will display its smallest value first
        Data.sort((a,b) => a.x - b.x);
        return Data;
    }

    //function to return the labels for chart ticks
    getTicks(data) {
        var ticks = [];
        data.forEach((item) => {
            ticks.push(item.x + "th");
        })
        return ticks;
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


        var chartData = this.calcDisplayData("grade");
        var ticks = this.getTicks(chartData);
        var pieData = this.calcDisplayData("age");
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
                <div class="col-3 createForm">
                    <label>Grade Breakdown</label>
                    <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
                        <VictoryAxis tickValues={[6,7,8,9,10,11,12]} tickFormat={ticks} />
                        <VictoryAxis dependentAxis />
                        <VictoryBar style={{data: {fill:"rgba(45, 241, 255, 0.938)"}}} data={chartData} />
                    </VictoryChart>
                    <label>Age Breakdown</label>
                    <VictoryPie style={{ labels: { fill: "rgba(255, 255, 255, 0.849)" } }} colorScale={["rgba(196, 0, 196, 0.849)", "rgba(45, 241, 255, 0.938)", "rgba(241, 37, 48, 0.849)"]} 
                    innerRadius={100} labelRadius={120} data={pieData} />
                </div>
            </React.Fragment>
        )
    }
}