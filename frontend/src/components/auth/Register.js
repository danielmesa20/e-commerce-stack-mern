import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import PropTypes from 'prop-types';
import { Container, Col, Button, Alert, Row, Jumbotron, Card, CardBody, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback, } from 'availity-reactstrap-validation';
import * as EmailValidator from 'email-validator';
import "./style_auth.css";

class signUp extends Component {

    state = {
        email: '',
        password: '',
        username: '',
        confirm_password: '',
        msg: null
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            //Check for register user
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.mgs.err });
            } else {
                this.setState({ msg: null });
            }
        }
    }

    //Update state
    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = async () => {

        //NEW USER DATA
        const newUser = {
            email: this.state.email,
            password: this.state.password,
            username: this.state.username,
        };

        //Attempt to register
        this.props.registerUser(newUser);
    }

    validate = (e) => {
        e.preventDefault();
        if(!EmailValidator.validate(this.state.email)){
            this.setState({ msg: 'Invalid email format' });
        } else if (this.state.password !== this.state.confirm_password) {
            this.setState({ msg: 'Passwords do not match' });
        } else if (this.state.password.length < 6) {
            this.setState({ msg: 'The password is very short (6)' });
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

                <Row className="row_auth">
                    <Col lg="6">
                        <Jumbotron className="jumbotron_auth">
                            <h3 className="title_auth">SIGN UP</h3>
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
                                            <Label id="label_auth" for="username">Username</Label>
                                            <AvInput type="text"
                                                className="input_auth"
                                                name="username"
                                                value={this.state.username}
                                                onChange={this.onInputChange}
                                                placeholder="Enter your username"
                                                required />
                                            <AvFeedback>You must enter your username</AvFeedback>
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
                                        <AvGroup>
                                            <Label id="label_auth" for="password_confirm">Confirm Password</Label>
                                            <AvInput type="password"
                                                className="input_auth"
                                                name="confirm_password"
                                                value={this.state.confirm_password}
                                                onChange={this.onInputChange}
                                                placeholder="Confirm your password"
                                                required />
                                            <AvFeedback>You must confirm your password</AvFeedback>
                                        </AvGroup>
                                        <Button className="button_auth" block>Create a acount</Button>
                                        <Link className="btn btn-info btn-block rounded-pill" to="/login">Go to Login</Link>
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

signUp.propTypes = {
    error: PropTypes.object.isRequired,
    registerUser: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    error: state.error
});

export default connect(mapStateToProps, { registerUser, clearErrors })(signUp);
