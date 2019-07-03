import React from 'react';
import './App.css';

//create component, contians the logic to add a new entry to the database
export class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {fname: '', lname: '', age: 11, grade: 6}
        
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    //handles changes to input fields
    //switch that changes state based on the event name
    onChangeHandler(event) {
        switch(event.target.name) {
            case 'fname':
                this.setState({fname: event.target.value});
                break;
            case 'lname':
                this.setState({lname: event.target.value});
                break;
            case 'age':
                this.setState({age: event.target.value});
                break;
            case 'grade':
                this.setState({grade: event.target.value});
                break;
        }
    }

    //call api to create a new database entry
    //returns an updated set of data to include the new data to the props.handleData function
    onSubmitHandler(event) {
        //make api call
        var url = new URL("http://localhost:8080/create")
        fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify({
            fname: this.state.fname,
            lname: this.state.lname,
            age: this.state.age,
            grade: this.state.grade,
        })
        })
        .then(res => res.json())
        .then(res => this.props.handleData(res))
        .catch(err => err);
        event.preventDefault();
        this.setState({fname: '', lname: ''})
    }

    render() {
        //shortcut to render the correct input options for age and grade
        var ageOptions = [];
        var gradeOptions = [];
        for (var i=0; i < 10; ++i) {
            ageOptions.push(<option value={i+11}>{i+11}</option>)
            if (i < 7) {
                gradeOptions.push(<option value={i+6}>{i+6}</option>)
            }
        }
        return (
            <form class="">
                <p>Create Entry</p>
                <p>First Name: <input type="text" name="fname" autoComplete="off" onChange={this.onChangeHandler} value={this.state.fname} /></p>
                <p>Last Name: <input type="text" name="lname" autoComplete="off" onChange={this.onChangeHandler} value={this.state.lname}  /></p>
                <p>Age: <select name="age" onChange={this.onChangeHandler}>
                        {ageOptions}
                    </select>
                </p>
                <p>Grade: <select name="grade" onChange={this.onChangeHandler}>
                        {gradeOptions}
                    </select>
                </p>
                <input class="formBtn col-12" type="button" name="Submit" value="Submit" onClick={this.onSubmitHandler} />
            </form>
        );
    }
}