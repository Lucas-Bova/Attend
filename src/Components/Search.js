import React from 'react';
import './App.css';

export class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {category: 'firstName', search: ''}

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(event) {
        event.target.name == 'category' ? this.setState({category: event.target.value}) : this.setState({search: event.target.value});
    }

    onSubmitHandler(event) {
        //make api call
        var url = new URL("http://localhost:8080/search")
        fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify({
            category: this.state.category,
            equals: this.state.search
        })
        })
        .then(res => res.json())
        .then(res => this.props.handleData(res))
        .catch(err => err);
        event.preventDefault();
        this.setState({search: ''})
    }

    render() {
        return (
            <React.Fragment>
                <p>Search</p>
                <label> Category to search by </label>
                <select name="category" onChange={this.onChangeHandler}>
                    <option value="firstName">First Name</option>
                    <option value="lastName">Last Name</option>
                    <option value="age">Age</option>
                    <option value="grade">Grade</option>
                </select>
                <p>Value to search for: <input type="text" name="search" autoComplete="off" onChange={this.onChangeHandler} value={this.state.search} /></p>
                <input class="formBtn col-12" type="button" name="Submit" value="Submit" onClick={this.onSubmitHandler} />
            </React.Fragment>
        )
    }
}