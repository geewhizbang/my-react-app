import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = this.getNullState();

    this.logInOut = this.logInOut.bind(this);
 
  }

  // async componentDidMount() {
   
  // }

  getNullState() {

    return {
      userName: "",
      userLogin: "",
      userPassword: "",
      errorMessage: null,
      message: null,
      formatedDate: null,
      currentPath: null,
      isLoggedIn: false
    };
  }

  nameChange(e) {
    this.setState({
      userName: e.target.value
    });
  }

  passwordChange(e) {
    this.setState({
      userPassword: e.target.value
    });
  }

  async login() {
    const params = { 
      userName: this.state.userName,
      password: this.state.userPassword
    };

    const userData = (await axios.post('http://localhost:8081/login', params)).data;
    
    var newState = {}
    if (userData.loginSuccess) {
        newState.message = userData.message;
        newState.errorMessage = null;
        newState.currentPath = userData.currentPath;
        newState.isLoggedIn = true;
        newState.formattedDate = Intl.DateTimeFormat('en-US',  {
        year: 'numeric',
        month: 'long',
        day: '2-digit' }).format(Date.parse(userData.date));
    } else {
      newState.errorMessage = userData.message;
    }
    this.setState(newState);

  };

  logInOut() {

    if (!this.state.isLoggedIn) {
      this.login();
    } else {
      this.setState(this.getNullState());
    }
  }

  render() {
    return (
      <div className="loginContainer">
        
        <div className="login">
            <title>Login for Test Application</title>
            <div className="ctrl">
                <label htmlFor="name">User Name</label>
                <input type="text" readOnly={ this.state.isLoggedIn } id="name" value={this.state.userName} onChange={this.nameChange.bind(this)}/>
            </div>
            <div className="ctrl">
                <label htmlFor="password">Password</label>
                <input type="password" readOnly={ this.state.isLoggedIn } onChange={this.passwordChange.bind(this)} value={this.state.userPassword} id="password"/>
            </div>
            { this.state.errorMessage
              ? <div className="errorMessage">{ this.state.errorMessage }</div> 
              : <div className="hide"></div>
            }

            { this.state.isLoggedIn
              ? <div className="loginResult">
                  <span>{ this.state.message }</span> 
                  <span>{ this.state.formattedDate }</span> 
                  <span>{ this.state.currentPath }</span> 
                </div>
              : <div className="hide"></div>
            }

            <button onClick={this.logInOut}>{ this.state.isLoggedIn ? <span>Logout</span> : <span>Login</span> }
            </button>
        </div>
        
      </div>
    )
  }
}

export default Login;