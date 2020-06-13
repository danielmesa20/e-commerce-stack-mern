import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import PropTypes from 'prop-types';
import {
    Container, Col, Button, Alert, Row, Jumbotron, Card,
    CardBody, Label, Modal, ModalBody, ModalHeader
} from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback, } from 'availity-reactstrap-validation';
import * as EmailValidator from 'email-validator';
import "./style_auth.css";

class signIn extends Component {

    state = {
        email: '',
        password: '',
        msg: null
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            //Check for register user
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.mgs.err });
            } else {
                this.setState({ msg: null });
            }
        }
    }

    //Update state
    onInputChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = async () => {

        //NEW USER DATA
        const newUser = {
            email: this.state.email,
            password: this.state.password,
        };

        //Attempt to register
        this.props.loginUser(newUser);

    }

    validate = (e) => {
        e.preventDefault();
        if (!EmailValidator.validate(this.state.email)) {
            this.setState({ msg: 'Invalid email format' });
        } else if (!this.state.email || !this.state.password) {
            this.setState({ msg: 'Empty credentials' })
        } else {
            this.onSubmit();
        }
    }

    onDismiss = () => this.setState({ msg: null });

    render() {
        return (

            <Container>

                {this.state.msg ?
                    <Alert className="alert" toggle={this.onDismiss}>
                        {this.state.msg}
                    </Alert>
                    : null
                }

                {this.props.authenticating

                    ? <div>
                        <Modal isOpen={true}>
                            <ModalHeader>Modal title</ModalHeader>
                            <ModalBody>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </ModalBody>
                        </Modal>
                    </div>

                    : null

                }

                <Row className="row_auth">
                    <Col lg="6">
                        <Jumbotron className="jumbotron_auth">
                            <h3 className="title_auth">SIGN IN</h3>
                            <Card className="card_auth">
                                <CardBody>
                                    <AvForm onValidSubmit={this.validate}>
                                        <AvGroup>
                                            <Label id="label_auth" for="email">Email</Label>
                                            <AvInput type="text"
                                                className="input_auth"
                                                name="email"
                                                value={this.state.email}
                                                onChange={this.onInputChange}
                                                placeholder="Enter your email"
                                                required />
                                            <AvFeedback>You must enter your email</AvFeedback>
                                        </AvGroup>
                                        <AvGroup>
                                            <Label id="label_auth" for="pasword">Passsword</Label>
                                            <AvInput type="password"
                                                className="input_auth"
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.onInputChange}
                                                placeholder="Enter your password"
                                                required />
                                            <AvFeedback>You must enter your password</AvFeedback>
                                        </AvGroup>
                                        <Button className="button_auth" block>Submit</Button>
                                        <Link className="btn btn-info btn-block rounded-pill" to="/register">Create a acount</Link>
                                    </AvForm>
                                </CardBody>
                            </Card>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        )
    }
}

signIn.propTypes = {
    loginUser: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    authenticating: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    error: state.error,
    authenticating: state.auth.authenticating
});

export default connect(mapStateToProps, { loginUser, clearErrors })(signIn);

