import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProduct, addComment } from '../../actions/productActions';
import PropTypes from 'prop-types';
import { Container, Col, Card, CardImg, CardTitle, Row, CardBody, CardText, Button } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback, } from 'availity-reactstrap-validation';
import "./product_styles.css";
import Empty from 'is-empty';
import ListComments from './ListComments';

class ProductProfile extends Component {

    state = {
        bodyComment: null
    }

    //InitState
    componentDidMount() {
        //Check is edit product or create product
        this.props.getProduct(this.props.match.params.idProduct);
    }

    editProduct = (id) => {
        this.props.history.push(`/edit/` + id);
    }

    //Update state
    onInputChange = (e) => this.setState({ [e.target.name]: e.target.value });

    validate = (e) => {
        e.preventDefault();
        //ADD COMMENT
        const newComment = new FormData();
        newComment.append("body", this.state.bodyComment);
        newComment.append("product_id", this.props.match.params.idProduct);
        newComment.append("user_id", this.props.user._id);
        this.props.addComment(newComment);
    }

    render() {

        const { product } = this.props.product;

        return (

            <Container>
                <Row className="row_profile_product">
                    <Col lg="6">
                        <Card className="card_product_profile">
                            <CardImg className="card_img_profile" top width="100%" height="200px"
                                src={product.imageURL ? product.imageURL : "/loading.gif"} alt="img" />
                            <CardBody className="card_body_product_profile">
                                {!Empty(product)
                                    ? <div>
                                        <CardTitle className="card_text">{product.name}</CardTitle>
                                        <CardText className="card_text">{product.description}</CardText>
                                        <CardText className="card_text">{product.category}</CardText>
                                        <CardText className="card_text">${product.price}</CardText>
                                        <CardText className="card_text">{product.Stock}</CardText>
                                        {this.props.user ?
                                            this.props.user._id === product.user_id
                                                ? < Button className="button_auth" onClick={() => this.editProduct(product._id)} block>Edit Product</Button>
                                                : < Button className="button_auth" onClick={null} block>Buy</Button>
                                            : null
                                        }
                                    </div>
                                    :
                                    <p className="text-center">Loading Product Data</p>
                                }
                            </CardBody>
                        </Card>

                        <AvForm onValidSubmit={this.validate}>
                            <AvGroup>
                                <AvInput type="text"
                                    className="input_auth"
                                    name="bodyComment"
                                    value={this.state.bodyComment}
                                    onChange={this.onInputChange}
                                    placeholder="Write a question"
                                    required />
                                <AvFeedback>You must enter the question</AvFeedback>
                            </AvGroup>
                            <Button id="search_button" block>Search</Button>
                        </AvForm>

                        <ListComments/>

                    </Col>
                </Row>
            </Container >
        )
    }
}

ProductProfile.propTypes = {
    getProduct: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product,
    user: state.auth.user
});

export default connect(mapStateToProps, { getProduct, addComment })(ProductProfile);

