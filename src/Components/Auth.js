import React from 'react';
import './App.css';

//unused Auth comonent, eventually will be used to authenticate users
export class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {login: false, signup: false, user: '', pass: ''};

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onChoiceHandler = this.onChoiceHandler.bind(this);
    }

    onChangeHandler(event) {
        if (event.target.name === 'username') {
            this.setState({user: event.target.value});
        } else if (event.target.name === 'password') {
            this.setState({pass: event.target.value});
        }
    }

    onSubmitHandler(event) {
        
    }

    onChoiceHandler(event) {
        event.target.name === "signup" ? this.setState({signup: true}) : this.setState({login: true});
    }


    render() {
        var render = (<React.Fragment><button class="col-4" type="button" name="login" onClick={this.onChoiceHandler}>Log in</button>
                       <button class="col-4" type="button" name="signup" onClick={this.onChoiceHandler}>Create Account</button> </React.Fragment>);
        if (this.state.login) {
            render = (<React.Fragment> <p>Enter Credentials</p>
                <p>Username: <input type="text" name="username"  autoComplete="off" onChange={this.onChangeHandler} /></p>
                <p>Password: <input type="text" name="password" autoComplete="off" onChange={this.onChangeHandler} /></p>
                <button class="col-12" type="button" name="submit" onClick={this.onSubmitHandler}>Submit!</button></React.Fragment>);
        } else if (this.state.signup) {
            render = (<React.Fragment><p>Enter Credentials</p>
                <p>Username: <input type="text" name="username"  autoComplete="off" onChange={this.onChangeHandler} /></p>
                <p>Password: <input type="text" name="password" autoComplete="off" onChange={this.onChangeHandler} /></p>
                <p>Confirm Password:  <input type="text" name="confirmpass" autoComplete="off" onChange={this.onChangeHandler} /></p>
                <button class="col-12" type="button" name="submit" onClick={this.onSubmitHandler}>Submit!</button></React.Fragment>)
        }
        return (
        <div class = "auth">
            {render}
        </div>
        )
    }
}