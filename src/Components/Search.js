import React from 'react';
import './App.css';

//search component, contains the logic to search the current set of data
export class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {category: 'firstName', search: ''}

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    //handles changes to input fields
    //if event name is category the change is applied to the category state, else the change is applied to the search state
    onChangeHandler(event) {
        event.target.name == 'category' ? this.setState({category: event.target.value}) : this.setState({search: event.target.value});
    }

    //call api to return data based on search parameters
    //calls the props.handleData function to return a new set of data to the table component
    onSubmitHandler(event) {
        if (!this.state.search) {
            alert("please enter search parameter");
        } else {
            //make api call
            fetch("/search", {
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