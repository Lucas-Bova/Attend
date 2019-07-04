import React from 'react';
import './App.css';

//loadscreen component, renders and animated loadscreen
export class LoadScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <div class = "loader">
                </div>
            </React.Fragment>
        )
    }
}