import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editProduct, getProduct } from '../../actions/productActions';
import PropTypes from 'prop-types';
import {
    Container, Col, Button, Alert, Row, Jumbotron,
    Card, CardBody, Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import "./product_styles.css";
import Loading from '../shared/Loading';

class UpdateProduct extends Component {

    //State component
    state = {
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category: '',
        myImage: '',
    }

    //InitState
    componentDidMount() {
        //Check is edit product or create product
        this.props.getProduct(this.props.match.params.idProduct);
    }

    //Enviando los datos del form al backend
    onSubmit = async () => {

        //New Form Object
        const newProduct = new FormData();

        //All field product edited
        const { product } = this.props.product;

        newProduct.append("myImage", this.state.myImage);
        newProduct.append("name", this.state.name
            ? this.state.name
            : product.name
        );
        newProduct.append("description", this.state.description
            ? this.state.description
            : product.description
        );
        newProduct.append("price", this.state.price
            ? this.state.price
            : product.price
        );
        newProduct.append("stock", this.state.stock
            ? this.state.stock
            : product.stock
        );

        newProduct.append("category", this.state.category
            ? this.state.category
            : product.category
        );

        newProduct.append("imageURL", product.imageURL);
        newProduct.append("public_id", product.public_id);
        this.props.editProduct(newProduct, this.props.match.params.idProduct);
    }


    validate = (e) => {
        e.preventDefault();
        this.onSubmit();
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

    render() {

        const { product } = this.props.product;

        return (

            <Container>

                {this.state.msg
                    ? <Alert className="alert" toggle={this.onDismiss}> {this.state.msg}</Alert>
                    : null
                }
                
                < Row className="row_auth">
                    {
                        this.props.product.loading === false ?
                            <Col lg="7">
                                <Jumbotron className="jumbotron_auth">
                                    <h4 className="title_auth">Edit a Product</h4>
                                    <Card className="card_auth">
                                        <CardBody>
                                            <Form onSubmit={this.validate}>
                                                <FormGroup>
                                                    <Label id="label_auth" for="email">Product Name</Label>
                                                    <Input type="text"
                                                        className="input_auth"
                                                        name="name"
                                                        value={this.state.name ? this.state.name : product.name}
                                                        onChange={this.onInputChange}
                                                        placeholder="Enter the product name" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label id="label_auth" for="description">Product description</Label>
                                                    <Input type="textarea"
                                                        className="input_auth"
                                                        name="description"
                                                        value={this.state.description ? this.state.description : product.description}
                                                        onChange={this.onInputChange}
                                                        placeholder="Enter the product description" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label id="label_auth" for="price">Product price ($)</Label>
                                                    <Input type="number"
                                                        className="input_auth"
                                                        name="price"
                                                        onChange={this.onInputChange}
                                                        value={this.state.price ? this.state.price : product.price}
                                                        placeholder="Enter the product price" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label id="label_auth" for="price">Stock of product</Label>
                                                    <Input type="number"
                                                        className="input_auth"
                                                        name="stock"
                                                        onChange={this.onInputChange}
                                                        value={this.state.stock ? this.state.stock : product.stock}
                                                        placeholder="Enter the product stock" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label id="label_auth" for="exampleSelect">Product Category</Label>
                                                    <Input type="select"
                                                        value={this.state.category ? this.state.category : product.category}
                                                        onChange={this.onInputChange}
                                                        name="category">
                                                        <option value="Alimentos">Alimentos</option>
                                                        <option value="Ropa">Ropa</option>
                                                        <option value="Electronica">Electronica</option>
                                                    </Input>
                                                </FormGroup>
                                                <Row xs="2">
                                                    <Col>
                                                        <FormGroup>
                                                            <Label id="label_auth" for="exampleFile">Product Image</Label>
                                                            <Input type="file"
                                                                onChange={this.onInputChange}
                                                                name="myImage"
                                                                accept=".png, .jpg, .jpeg" />
                                                            <FormText color="muted">
                                                                This field only files with .png, .jpg and .jpeg extensions
                                                            </FormText>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col>
                                                        <Label id="label_auth" for="exampleFile">Product image preview</Label>
                                                        <Container className="image_container">
                                                            <img src={this.state.myImage ? URL.createObjectURL(this.state.myImage) : product.imageURL}
                                                                className="image_product" alt="productImage"></img>
                                                        </Container>
                                                    </Col>
                                                </Row>
                                                <Button className="button_auth" block>Edit</Button>
                                            </Form>
                                        </CardBody>
                                    </Card>
                                </Jumbotron>
                            </Col>

                            : <Loading />

                    } </Row>

            </Container>
        )
    }
}

UpdateProduct.propTypes = {
    editProduct: PropTypes.func.isRequired,
    getProduct: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { editProduct, getProduct })(UpdateProduct);
