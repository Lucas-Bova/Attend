import React from 'react';
import './App.css';
import {Create} from './Create';
import {Delete} from './Delete';
import {Update} from './Update';
import {VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryPie} from 'victory';
import {loadScreen} from './LoadScreen';
import {Search} from './Search';


function CategoryRow(props) {
    return (
        <th>
            {props.category}
        </th>
    );
}

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

//create a grid to list out each student: fname, lname, age, grade
export class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: this.props.data}

        this.handleData = this.handleData.bind(this);
        this.calcChartData = this.calcChartData.bind(this);
        this.calcPieData = this.calcPieData.bind(this);
    }

    handleData(obj) {
        this.setState({data: obj});
    }

    calcChartData() {
        var chartData = [
            {grade: 6, count: 0},
            {grade: 7, count: 0},
            {grade: 8, count: 0},
            {grade: 9, count: 0},
            {grade: 10, count: 0},
            {grade: 11, count: 0},
            {grade: 12, count: 0},
        ]
        this.state.data.forEach((item) => {
            var i;
            for (i = 0; i < chartData.length; i++) {
                if (chartData[i].grade == item.grade) {
                    chartData[i].count++;
                }
            }
        })

        return chartData;
    }

    calcPieData() {
        var pieData = []
        this.state.data.forEach((item) => {
            if (pieData.length == 0) {
                pieData.push({age: item.age, count: 0});
            }
            var foundItem = false;
            for (var i = 0; i < pieData.length; i++) {
                if (pieData[i].age === item.age) {
                    pieData[i].count++;
                    foundItem = true;
                }
            }
            if (!foundItem) {pieData.push({age: item.age, count: 1})}
        })
        return pieData;
    }

    render() {
        var rows = [];
        var keyRows = []
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
        this.state.data.forEach((item) => {
            rows.push(
                <DataRow data={item} />
            )
        })

        var chData = this.calcChartData();
        var pieData = this.calcPieData();
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
                        <VictoryAxis tickValues={[6,7,8,9,10,11,12]} tickFormat={["6th", "7th", "8th", "9th", "10th", "11th", "12th"]} />
                        <VictoryAxis dependentAxis />
                        <VictoryBar style={{data: {fill:"rgba(45, 241, 255, 0.938)"}}} data={chData} x="grade" y="count" />
                    </VictoryChart>
                <label>Age Breakdown</label>
                    <VictoryPie style={{ labels: { fill: "rgba(255, 255, 255, 0.849)" } }} colorScale={["rgba(196, 0, 196, 0.849)", "rgba(45, 241, 255, 0.938)", "rgba(241, 37, 48, 0.849)"]} 
                    innerRadius={100} labelRadius={120} data={pieData} x="age" y="count" />
                </div>
            </React.Fragment>
        )
    }
}