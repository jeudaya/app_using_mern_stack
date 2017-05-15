import React from 'react';
import {connect} from  'react-redux'
import {loginUser} from  '../actions/authaction.js'
import {Link} from 'react-router'

class Login extends React.Component{

	loginUser(e) {
		e.preventDefault();
	   var loginData={};
	   loginData.username=this.refs.username.value;
	   loginData.password=this.refs.password.value;
	
	   this.props.dispatch(loginUser(loginData));
	  }


	render(){
		return (<div className="container mar-top-90">
    	<div className="row">
			<div className="col-md-6 col-md-offset-3">
				<div className="panel panel-login">
					<div className="panel-heading">
						<div className="row">
							<div className="col-xs-12">
								<a href="#" className="active" id="login-form-link">Login</a>
							</div>
							
						</div>
					</div>
					<div className="panel-body">
						<div className="row">
							<div className="col-lg-12">
								<form id="login-form" role="form" >
									<div className="form-group">
										<input type="text" name="username" ref="username" id="username1"  className="form-control " placeholder="Username" />
									</div>
									<div className="form-group">
										<input type="password" name="password" ref="password" id="password"  className="form-control" placeholder="Password" />
									</div>
									 <div className="form-group text-center">
									  <span className="error">{this.props.login.msg}</span>
									</div> 
									<div className="form-group">
										<div className="row">
											<div className="col-sm-6 col-sm-offset-3">
												
												<button className="form-control btn btn-login" onClick={this.loginUser.bind(this)}>Log In</button>
											</div>
										</div>
									</div>
									<div className="form-group">
										<div className="row">
											<div className="col-lg-12">
												<div className="text-center">
												</div>

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
);
	}
}

function mapStateToProps  (state){
  return{
    login:state.auth
  }
}

export default connect(mapStateToProps)(Login);
