import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Test, ApiCall, postApiCall, responseGoogle } from './actions.js';
import styles from './styles.scss';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 


class Dp extends Component {
  responseGoogle(response){
	 this.props.responseGoogle(response);
  }

  responseFacebook(response){
    console.log("Facebook se response aya: ",response);
  }

  componentDidMount(){
    if(localStorage.getItem('google-auth-token')){
      let user_data = JSON.parse(localStorage.getItem('user_details'));
      // this.closeToast(user_data.email);
      this.props.history.push('/profile/'+user_data.email)
    }
  }
  
  render() {
   console.log("props :", this.props);
   if(localStorage.getItem('google-auth-token')){
    let user_data = JSON.parse(localStorage.getItem('user_details'));
    this.props.history.push('/profile/'+user_data.email)
  }
	 return (
		<div>
  <Container>
    <Row className="col-center">
      <Col md={3}></Col>
      <Col md={6}>
      <img
       height="100px"
       width="80%"
       src="https://res.cloudinary.com/arorashivam-com-resume/image/upload/v1555929183/zomato-logo_v0erpj.png" 
       alt="zomoto-logo"
       style={{marginBottom:'15px'}}
       />
       <div style={{marginBottom:'15px'}}>
         Join Minimal Instagram Network
       </div>
        <GoogleLogin
        clientId = "465032833040-1idllsns8hrmcnvu7reifrpqhko7qu51.apps.googleusercontent.com"
        buttonText = "Log In With Google"
        onSuccess = {(response)=>{this.responseGoogle(response)}}
        onFailure = {(response)=>{this.responseGoogle(response)}}
        cookiePolicy = {'single_host_origin'}
        />

        <div style={{marginBottom:'15px',marginTop:'15px'}}>
          OR
        </div>

        <FacebookLogin
            appId="703918510022358"
            autoLoad={false}
            fields="name,email,picture"
            callback={(response)=>{this.responseFacebook(response)}}
            cssClass="kep-login-facebook"
            icon="fa-facebook"
          />
      </Col>
      <Col md={3}></Col>
    </Row>
  </Container>
		  {this.props.visibility &&
			 <div className="full-loader">
				<div className="relative">
				  <div className="abs" id='full-screen-loader-wrapper'>
					 <CircularProgress size={50} thickness={5} />
				  </div>
				</div>
			 </div>
      }
     <ToastContainer 
      autoClose={2500} 
     />
    </div>
	 );
  }
}

const mapStateToProps = state => ({
  test: state.postReducer.test,
  response: state.postReducer.response,
  Postresponse: state.postReducer.Postresponse,
  visibility: state.postReducer.visibility,
  googleResponse: state.postReducer.googleResponse
})

export default connect(mapStateToProps, { Test, ApiCall, postApiCall, responseGoogle })(Dp);

