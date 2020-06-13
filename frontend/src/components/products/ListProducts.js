import React, { Component } from 'react';
//Confirm Message
import { confirmAlert } from 'react-confirm-alert';
//Redux
import { connect } from 'react-redux';
import { getProducts, deleteProduct, cleanProductEdited, getUserProducts } from '../../actions/productActions';
import PropTypes from 'prop-types';
import {
    Card, CardImg, CardBody, CardTitle, Button, Col,
    Jumbotron, CardText
} from 'reactstrap';
import { format } from 'timeago.js';
import Loading from '../shared/Loading';
import FilteredProducts from '../products/FilteredProducts';

class ProductsList extends Component {

    componentDidMount() {
        //GET LIST OF PRODUCTS
        if (this.props.match.params.idUser) {
            this.props.getUserProducts(this.props.match.params.idUser);
        } else {
            this.props.getProducts();
        }
    }

    confirMessage = (idProduct) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to do this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.props.deleteProduct(idProduct)
                },
                {
                    label: 'No',
                    onClick: () => null
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
        });
    };

    editProduct = (id) => {
        this.props.cleanProductEdited();
        this.props.history.push(`/edit/` + id);
    }

    profileProduct = (id) => {
        this.props.cleanProductEdited();
        this.props.history.push(`/profile/` + id);
    }

    render() {

        return (

            <div className="row">

                <FilteredProducts />

                {

                    this.props.product.loading === false ?

                        this.props.product.filteredProducts.length > 0

                            ? this.props.product.filteredProducts.map(product => (

                                <Col className="col_products" lg="3" key={product._id}>
                                    <Card className="card_product">
                                        <CardImg className="card_img" top width="100%" height="200px"
                                            src={product.imageURL ? product.imageURL : "/loading.gif"}
                                            alt="img" onClick={() => this.profileProduct(product._id)} />
                                        <CardBody className="card_body_products">
                                            <CardTitle>{product.name}  -  ${product.price}</CardTitle>
                                            <hr style={{ border: "1px solid #393e46" }}></hr>
                                            <CardText>{format(product.create)}</CardText>
                                            {
                                                this.props.match.params.idUser
                                                    ? <div className="div_buttons">
                                                        <Button color="primary" className="button_products" onClick={() => this.editProduct(product._id)}>Edit</Button>
                                                        <Button color="danger" className="button_products" onClick={() => this.confirMessage(product._id)}>Delete</Button>
                                                    </div>
                                                    : null
                                            }
                                        </CardBody>
                                    </Card>
                                </Col>
                            ))
                            :

                            <div className="row pt-4 mx-auto">
                                <Jumbotron className="jumbotron">
                                    <h1 className="display-3">No products were found.</h1>
                                    <p className="lead">No products were found with the entered specifications.</p>
                                </Jumbotron>
                            </div>

                        : <Loading />

                }
            </div>
        )
    }
}

ProductsList.propTypes = {
    getProducts: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    cleanProductEdited: PropTypes.func.isRequired,
    getUserProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    authUser: PropTypes.object
}

const mapStateToProps = (state) => ({
    product: state.product,
    authUser: state.auth.user
});

export default connect(mapStateToProps,
    { getProducts, deleteProduct, cleanProductEdited, getUserProducts }
)(ProductsList);