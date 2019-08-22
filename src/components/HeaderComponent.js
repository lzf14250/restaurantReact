import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron, 
    Button, Modal, ModalBody, ModalHeader, Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const validName = (val) => /^[A-Za-z]*/i.test(val);

class Header extends Component {

    constructor(props) {
        super(props);
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.toggleSignupModal = this.toggleSignupModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.checkPassword = this.checkPassword.bind(this);

        this.state = {
            isNavOpen: false,
            isLoginModalOpen: false,
            isSignupModalOpen: false,
            passwordMessage: '',
            passwordIsSame: false
        };
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleLoginModal() {
        this.setState({
            isLoginModalOpen: !this.state.isLoginModalOpen
        });
    }

    toggleSignupModal() {
        this.setState({
            isSignupModalOpen: !this.state.isSignupModalOpen
        });
    }

    handleLogin(event) {
        this.toggleLoginModal();
        this.props.loginUser({
            username: this.loginUsername.value,
            password: this.loginPassword.value
        });
        event.preventDefault();
    }

    handleSignup(event) {
        this.toggleSignupModal();
        if (this.state.passwordIsSame && this.signupPassword.value) {
            this.props.signupUser(this.signupUsername.value, this.signupPassword.value, 
                this.firstname.value, this.lastname.value);
        }
        event.preventDefault();
    }

    handleLogout() {
        this.props.logoutUser();
    }

    checkPassword() {
        if (this.signupPassword.value === this.confirmPassword.value && this.signupPassword.value) {
            this.setState({
                passwordMessage: 'Password Confirmed',
                passwordIsSame: true
            })
        }
        else {
            this.setState({
                passwordMessage: 'Password not the same',
                passwordIsSame: false
            })
        } 
    }

    render() {
        return (
            <>
                <Navbar dark color="primary" expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">
                            <img src="assets/images/logo.png" height="30" width="41"
                                alt="Ristorante Con Fusion"/>
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link"  to='/home'>
                                        <span className="fa fa-home fa-lg"></span> Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/aboutus'>
                                        <span className="fa fa-info fa-lg"></span> About Us
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link"  to='/menu'>
                                        <span className="fa fa-list fa-lg"></span> Menu
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link"  to='/favorites'>
                                        <span className="fa fa-heart fa-lg"></span> Favorites
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/contactus'>
                                        <span className="fa fa-address-card fa-lg"></span> Contact Us
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    {this.props.auth.isAuthenticated ?
                                        <div>
                                            <div className="navbar-text mr-3">{this.props.auth.user.username}</div>
                                            <Button outline onClick={this.handleLogout}>
                                                <i className="fa fa-sign-out fa-lg"></i> Logout
                                            </Button>
                                        </div>
                                        :
                                        <div>
                                            <Button outline onClick={this.toggleLoginModal}>
                                                <i className="fa fa-sign-in fa-lg"></i> Login
                                            </Button>
                                            <Button outline onClick={this.toggleSignupModal}>
                                                <i className="fa fa-user-plus fa-lg"></i> Signup
                                            </Button>
                                        </div>
                                    }
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ristorante Con Fusion</h1>
                                <p>We take inspiration from the World's best cuisines,
                                     and create a unique fusion experience. 
                                     Our lipsmacking creations will tickle your 
                                     culinary senses!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isLoginModalOpen} toggle={this.toggleLoginModal}>
                    <ModalHeader toggle={this.toggleLoginModal}>
                        Login
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="loginUsername">Username</Label>
                                <Input type="text" id="loginUsername" name="loginUsername" 
                                    innerRef={(input) => this.loginUsername = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="loginPassword">Password</Label>
                                <Input type="password" id="loginPassword" name="loginPassword" 
                                    innerRef={(input) => this.loginPassword = input}/>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remeber" 
                                        innerRef={(input) => this.remeber = input}/>
                                    Remeber me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isSignupModalOpen} toggle={this.toggleSignupModal}>
                    <ModalHeader toggle={this.toggleSignupModal}>
                        Signup
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSignup}>
                            <FormGroup>
                                <Label htmlFor="signupUsername">Username</Label>
                                <Input type="text" id="signupUsername" name="signupUsername" 
                                    innerRef={(input) => this.signupUsername = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="signupPassword">Password</Label>
                                <Input type="password" id="signupPassword" name="signupPassword" 
                                    innerRef={(input) => this.signupPassword = input}/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input type="password" id="confirmPassword" name="confirmPassword" 
                                    innerRef={(input) => this.confirmPassword = input}
                                    onChange={this.checkPassword} />
                            </FormGroup>
                            <FormGroup>
                                <span style={{color: "red"}}>{this.state.passwordMessage}</span>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="firstname">Firstname</Label>
                                <Input type="text" id="firstname" name="firstname" 
                                    innerRef={(input) => this.firstname = input}/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="lastname">Lastname</Label>
                                <Input type="text" id="lastname" name="lastname" 
                                    innerRef={(input) => this.lastname = input}/>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Signup</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

export default Header;