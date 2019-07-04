import React from 'react';
import './App.css';
import {VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryPie, VictoryScatter} from 'victory';

//delete component, contains logic to delete an entry from the db
export class Charts extends React.Component {
    constructor(props) {
        super(props);     
        
        this.getTicks = this.getTicks.bind(this);
        this.calcDisplayData = this.calcDisplayData.bind(this);
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
        this.props.data.forEach((item) => {
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
    getTicks(data, end) {
        var ticks = [];
        data.forEach((item) => {
            ticks.push(item.x + end);
        })
        return ticks;
    }

    render() {
        var chartData = this.calcDisplayData("grade");
        var chartTicks = this.getTicks(chartData, "th");
        var pieData = this.calcDisplayData("age");
        var pieTicks = this.getTicks(pieData, "");
        return (
        <div class="col-3 createForm">
            <label>Grade Breakdown</label>
            <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
                <VictoryAxis tickValues={[6,7,8,9,10,11,12]} tickFormat={chartTicks} />
                <VictoryAxis dependentAxis />
                <VictoryBar style={{data: {fill:"rgba(45, 241, 255, 0.938)"}}} data={chartData} />
            </VictoryChart>
            <label>Age Breakdown</label>
            <VictoryPie style={{ labels: { fill: "rgba(255, 255, 255, 0.849)" } }} colorScale={["rgba(196, 0, 196, 0.849)", "rgba(45, 241, 255, 0.938)", "rgba(241, 37, 48, 0.849)"]} 
            innerRadius={100} labelRadius={120} data={pieData} />
            <VictoryChart theme={VictoryTheme.material} domain={{x:[11, 20], y:[0, Math.max.apply(Math, pieData.map(o =>  o.y, 0))]}} >
                <VictoryAxis tickValues={[11,12,13,14,15,16,17,18,19,20]} tickFormat={pieTicks} />
                <VictoryAxis dependentAxis />
                <VictoryScatter style={{data:{fill:"rgba(196, 0, 196, 0.849)"}}} symbol="diamond" size={7} data={pieData}/>
            </VictoryChart>
        </div>
        )
    }
}