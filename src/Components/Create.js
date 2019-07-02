import React from 'react';
import './App.css';

export class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {fname: '', lname: '', age: '', grade: ''}
        
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

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
        this.setState({fname: '', lname: '', age: '', grade: ''})
    }

    render() {
        return (
            <form class="">
                <p>Create Entry</p>
                <p>First Name: <input type="text" name="fname" autoComplete="off" onChange={this.onChangeHandler} value={this.state.fname} /></p>
                <p>Last Name: <input type="text" name="lname" autoComplete="off" onChange={this.onChangeHandler} value={this.state.lname}  /></p>
                <p>Age: <input type="text" name="age" autoComplete="off" onChange={this.onChangeHandler} value={this.state.age}  /></p>
                <p>Grade: <input type="text" name="grade" autoComplete="off" onChange={this.onChangeHandler} value={this.state.grade}  /></p>
                <input class="formBtn col-12" type="button" name="Submit" value="Submit" onClick={this.onSubmitHandler} />
            </form>
        );
    }
}