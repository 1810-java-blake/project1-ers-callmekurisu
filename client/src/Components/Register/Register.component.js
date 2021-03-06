import React from 'react';
import ErsClient from '../../Axios/ErsClient';
import { Link } from 'react-router-dom';

export class RegisterComponent extends React.Component {
constructor(props){
    super(props);

    this.state = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        cPassword: '',
        registered: false
    }
}

firstNameChange = (e) => {
    this.setState({
      ...this.state,
      firstName: e.target.value
    })
  }

  lastNameChange = (e) => {
    this.setState({
      ...this.state,
      lastName: e.target.value
    })
  }
  usernameChange = (e) => {
    this.setState({
      ...this.state,
      username: e.target.value
    })
  }
  emailChange = (e) => {
    this.setState({
      ...this.state,
      email: e.target.value
    })
  }
  passwordChange = (e) => {
    this.setState({
      ...this.state,
      password: e.target.value
    })
  }

  confirmPassword = (e) => {
      this.setState({
          ...this.state,
          cPassword: e.target.value
      })

  }
submit = (e) => {
    e.preventDefault();
    //don't mutate state!!!
    let info = Object.assign({}, this.state);
    //remove cPassword and registered not need for POST request
    delete info.cPassword;
    delete info.registered;
    ErsClient.post('users', info)
      .then(res => {
        if (res.status === 200){
            //display message to coincide with success registration
            this.setState({...this.state, registered:true});
        }
      })
      .catch(err => {
          //redirect to 404 page if something goes wrong
          //no logic for unique user names yet
       window.location.assign('127.0.0.1/404')
        console.log(err);
      })
      //redirect to sign-in page after 3 seconds
      
    
    }

    render() {
        return (

            <div className="container" id="login-main">
                <div className="row">
                    <div className="col-12 col-md-offset-3">
                        <div className="panel panel-login">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-xs-6">
                                        <h6><strong>Register for Revature ERS</strong></h6>
                                    </div>
                                </div>
                                <hr />
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-12">

                                        <form id="register-form" onSubmit={this.submit}>
                                            <div className="form-group">
                                                <input type="text" name="firstName" id="firstname" tabIndex="1" className="form-control" placeholder="First Name" required
                                                onChange={this.firstNameChange}/>
                                            </div>

                                            <div className="form-group">
                                                <input type="text" name="lastName" id="lastName" tabIndex="1" className="form-control" placeholder="Last Name" required
                                                onChange={this.lastNameChange}/>
                                            </div>

                                            <div className="form-group">
                                                <input type="text" name="username" id="username" tabIndex="1" className="form-control" placeholder="Username" required
                                                onChange={this.usernameChange}/>
                                            </div>
                                            <div className="form-group">
                                                <input type="email" name="email" id="email" tabIndex="1" className="form-control" placeholder="Email Address" required 
                                                onChange={this.emailChange}/>
                                            </div>
                                            <div className="form-group">
                                                <input type="password" name="password" id="password" tabIndex="2" className="form-control" placeholder="Password" required
                                                onChange={this.passwordChange}/>
                                            </div>
                                            <div className="form-group">
                                                <input type="password" name="confirm-password" id="confirm-password" tabIndex="2" className="form-control" placeholder="Confirm Password" required
                                                onChange={this.confirmPassword}/>
                                                {this.state.cPassword !== 
                                                this.state.password && this.state.cPassword.length > 0 ?
                                                <h4>Password doesn't match!</h4> :
                                                this.state.cPassword === 
                                                    this.state.password && this.state.cPassword.length > 0 ? 
                                                <h4>All good!</h4> : <p></p>
                                                 }
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-xl col-lg col-sm-6 col-sm-offset-3">
                                                        <input type="submit" name="register-submit" id="login-submit" tabIndex="4" className="form-control btn btn-register" />
                                                        {this.state.registered === true &&
                                                        <>
                                                        <h4>Thanks for registering!</h4>
                                                       <Link to="/employee-sign-in">
                                                        <h4>Sign-in Now!</h4></Link> 
                                                        </> 
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </form>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}