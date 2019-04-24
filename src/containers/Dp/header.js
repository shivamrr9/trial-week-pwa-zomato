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
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

class Header extends Component {
  render() {
	 return (
		<div>
     <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">
        <img width="40px" 
        src="https://res.cloudinary.com/arorashivam-com-resume/image/upload/v1555929183/zomato-logo_v0erpj.png" 
        /> Minimal Instagram</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">      
          </Nav>
          <Nav>
          <Nav.Link>{ JSON.parse(localStorage.getItem('user_details')) &&
           "Hi " + JSON.parse(localStorage.getItem('user_details')).name
            } 
            </Nav.Link>
            <NavDropdown 
            title={JSON.parse(localStorage.getItem('user_details')) ? <img src={JSON.parse(localStorage.getItem('user_details')).imageUrl} className="user-image"></img> : ""} 
            id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
		</div>
	 );
  }
}

const mapStateToProps = state => ({
  test: state.postReducer.test,
  response: state.postReducer.response,
  Postresponse: state.postReducer.Postresponse,
  visibility: state.postReducer.visibility,
})

export default connect(mapStateToProps, { Test, ApiCall, postApiCall, })(Header);

