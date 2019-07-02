import React from 'react';
import './App.css';

export class Update extends React.Component {
    constructor(props) {
        super(props);
        this.state = {category: 'firstName', value: '', id: this.props.data[0].ID}
        
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(event) {
        switch(event.target.name) {
            case 'category':
                this.setState({category: event.target.value});
                break;
            case 'value':
                this.setState({value: event.target.value});
                break;
            case 'id':
                this.setState({id: event.target.value});
                break;
        }
    }

    onSubmitHandler(event) {
        //make api call
        var url = new URL("http://localhost:8080/update")
        fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify({
            id: this.state.id,
            category: this.state.category,
            value: this.state.value,
        })
        })
        .then(res => res.json())
        .then(res => this.props.handleData(res))
        .catch(err => err);
        event.preventDefault();
        this.setState({value: ''})
    }

    render() {
        var options = [];
        this.props.data.forEach((item) => {
            options.push(
                <option value={item.ID}> {item.ID} </option>
            )
        })
        return (
            <form class="">
                <p>Update Entry</p>
                <label>ID </label>
                <select name="id" onChange={this.onChangeHandler}>
                    {options}
                </select>
                <label> Category </label>
                <select name="category" onChange={this.onChangeHandler}>
                    <option value="firstName">First Name</option>
                    <option value="lastName">Last Name</option>
                    <option value="age">Age</option>
                    <option value="grade">Grade</option>
                </select>
                <p>New value: <input type="text" name="value" autoComplete="off" onChange={this.onChangeHandler} value={this.state.value}  /></p>
                <input class="formBtn col-12" type="button" name="Submit" value="Submit" onClick={this.onSubmitHandler} />
            </form>
        )
    }
}