import React from 'react';
import './App.css';

export class Delete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {id: this.props.data[0].ID}
        
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(event) {
        this.setState({id: event.target.value});
    }

    onSubmitHandler(event) {
        //make api call
        var url = new URL("http://localhost:8080/delete")
        fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify({
            id: this.state.id,
        })
        })
        .then(res => res.json())
        .then(res => this.props.handleData(res))
        .catch(err => err);
        event.preventDefault();
        this.setState({id: this.state.id})
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
                <p>Delete Entry</p>
                <label>ID </label>
                <select name="id" value={this.state.id} onChange={this.onChangeHandler}>
                    {options}
                </select>
                <br />
                <br />
                <input class="formBtn col-12" type="button" name="Submit" value="Submit" onClick={this.onSubmitHandler} />
            </form>
        )
    }
}