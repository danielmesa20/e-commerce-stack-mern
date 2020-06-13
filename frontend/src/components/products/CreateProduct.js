import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../../actions/productActions';
import PropTypes from 'prop-types';
import {
    Container, Col, Button, Alert, Row, Jumbotron,
    Card, CardBody, Label, FormText
} from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback, } from 'availity-reactstrap-validation';
import "./product_styles.css";

class CreateProduct extends Component {

    //State component
    state = {
        name: '',
        description: '',
        price: '',
        stock: '',
        category: 'Alimentos',
        myImage: '',
        editing: false,
    }

    //Enviando los datos del form al backend
    onSubmit = async () => {

        //New Form Object
        const newProduct = new FormData();

        newProduct.append("myImage", this.state.myImage);
        newProduct.append("name", this.state.name);
        newProduct.append("description", this.state.description);
        newProduct.append("price", this.state.price);
        newProduct.append("stock", this.state.stock);
        newProduct.append("category", this.state.category);
        newProduct.append("user_id", this.props.auth.user._id)
        this.props.addProduct(newProduct);
        this.clearForm();
    }


    validate = (e) => {
        e.preventDefault();
        //CREATE PRODUCT
        if (this.state.price < 0 || this.state.stock < 0) {
            this.setState({ msg: 'You can only enter numbers greater than 0' });
        } else {
            this.onSubmit();
        }
    }

    onDismiss = () => this.setState({ msg: null });

    //Update state
    onInputChange = (e) => {
        switch (e.target.name) {
            case 'myImage':
                this.setState({ myImage: e.target.files[0] });
                break;
            default:
                this.setState({ [e.target.name]: e.target.value });
        }
    }

    //Clear form 
    clearForm() {
        this.setState({
            name: '',
            description: '',
            price: '',
            stock: '',
            category: 'Alimentos',
            myImage: '',
        });
    }

    render() {

        return (

            <Container>

                {this.state.msg
                    ? <Alert color="warning" className="alert" toggle={this.onDismiss}> {this.state.msg}</Alert>
                    : null
                }

                <Row className="row_auth">
                    <Col lg="7">
                        <Jumbotron className="jumbotron_auth">
                            <h4 className="title_auth">Create a Product</h4>
                            <Card className="card_auth">
                                <CardBody>
                                    <AvForm onValidSubmit={this.validate}>
                                        <AvGroup>
                                            <Label id="label_auth" for="email">Product Name</Label>
                                            <AvInput type="text"
                                                className="input_auth"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onInputChange}
                                                placeholder="Enter the product name"
                                                required />
                                            <AvFeedback>You must enter the product name</AvFeedback>
                                        </AvGroup>
                                        <AvGroup>
                                            <Label id="label_auth" for="description">Product description</Label>
                                            <AvInput type="textarea"
                                                className="input_auth"
                                                name="description"
                                                value={this.state.description}
                                                onChange={this.onInputChange}
                                                placeholder="Enter the product description"
                                                required />
                                            <AvFeedback>You must enter the product description</AvFeedback>
                                        </AvGroup>
                                        <AvGroup>
                                            <Label id="label_auth" for="price">Product price ($)</Label>
                                            <AvInput type="number"
                                                className="input_auth"
                                                name="price"
                                                value={this.state.price}
                                                onChange={this.onInputChange}
                                                placeholder="Enter the product price"
                                                required />
                                            <AvFeedback>You must enter the product price</AvFeedback>
                                        </AvGroup>
                                        <AvGroup>
                                            <Label id="label_auth" for="price">Stock of product</Label>
                                            <AvInput type="number"
                                                className="input_auth"
                                                name="stock"
                                                value={this.state.stock}
                                                onChange={this.onInputChange}
                                                placeholder="Enter the product stock"
                                                required />
                                            <AvFeedback>You must enter the product stock</AvFeedback>
                                        </AvGroup>
                                        <AvGroup>
                                            <Label id="label_auth" for="exampleSelect">Product Category</Label>
                                            <AvInput type="select"
                                                value={this.state.category}
                                                onChange={this.onInputChange}
                                                name="category">
                                                <option value="Alimentos">Alimentos</option>
                                                <option value="Ropa">Ropa</option>
                                                <option value="Electronica">Electronica</option>
                                            </AvInput>
                                            <AvFeedback>You must enter the product category</AvFeedback>
                                        </AvGroup>
                                        <Row xs="2">
                                            <Col>
                                                <AvGroup>
                                                    <Label id="label_auth" for="exampleFile">Product Image</Label>
                                                    <AvInput type="file"
                                                        className="input_auth"
                                                        name="myImage"
                                                        onChange={this.onInputChange}
                                                        accept=".png, .jpg, .jpeg"
                                                        required />
                                                    <FormText color="muted">
                                                        This field only files with .png, .jpg and .jpeg extensions
                                                    </FormText>
                                                    <AvFeedback>You must enter the product image</AvFeedback>
                                                </AvGroup>
                                            </Col>
                                            <Col>
                                                <Label id="label_auth" for="exampleFile">Product image preview</Label>
                                                <Container className="image_container">
                                                    <img src={this.state.myImage ? URL.createObjectURL(this.state.myImage) : "/product-placeholder.gif"}
                                                        className="image_product" alt="productImage"></img>
                                                </Container>
                                            </Col>
                                        </Row>
                                        <Button className="button_auth" block>Create</Button>
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

CreateProduct.propTypes = {
    addProduct: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product,
    auth: state.auth
});

export default connect(mapStateToProps, { addProduct })(CreateProduct);
