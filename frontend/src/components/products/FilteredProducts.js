import React, { Component } from 'react'
import { connect } from 'react-redux';
import { filterProducts, resetListProducts } from '../../actions/productActions';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';

class FilteredProducts extends Component {

    state = {
        filterCategory: 'DEFAULT',
        filterName: '',
        filterPrice: 'DEFAULT',
        filterAvailability: 'DEFAULT',
    }

    //Update State Component
    onInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    //RESET PRODUCTS LIST
    resetListProducts = () => {
        this.setState({
            filterCategory: 'DEFAULT',
            filterName: '',
            filterPrice: 'DEFAULT',
            filterAvailability: 'DEFAULT'
        });
        this.props.resetListProducts();
    }

    render() {
        return (
            <div className="input-group">

                <Input type="select"
                    value={this.state.filterCategory}
                    onChange={this.onInputChange}
                    name="filterCategory">
                    <option value="DEFAULT">All Categories</option>
                    <option value="Alimentos">Alimentos</option>
                    <option value="Ropa">Ropa</option>
                    <option value="Electronica">Electronica</option>
                </Input>

                <Input type="select"
                    value={this.state.filterAvailability}
                    onChange={this.onInputChange}
                    name="filterAvailability">
                    <option value="Alimentos">Alimentos</option>
                    <option value="Ropa">Ropa</option>
                    <option value="Electronica">Electronica</option>
                </Input>

                <Input type="select"
                    value={this.state.filterPrice}
                    onChange={this.onInputChange}
                    name="filterPrice">
                    <option value="DEFAULT">All prices</option>
                    <option value="0to2">0 - 2 ($)</option>
                    <option value="2to5">2 - 5 ($)</option>
                    <option value="5to8">5 - 8 ($)</option>
                    <option value="8orMore">8 or more ($) </option>
                </Input>

                <Input type="text"
                    className="input_auth"
                    name="filterName"
                    value={this.state.filterName}
                    onChange={this.onInputChange}
                    placeholder="Enter the product name">
                </Input>

                <div className="input-group-append">
                    <button className="btn" id="reset_button" onClick={() => this.resetListProducts()}>Reset</button>
                    <button className="btn" id="search_button" onClick={() =>
                        this.props.filterProducts(this.state.filterCategory, this.state.filterName)}>Search</button>
                </div>
            </div>
        )
    }
}

FilteredProducts.propTypes = {
    filterProducts: PropTypes.func.isRequired,
    resetListProducts: PropTypes.func.isRequired
}

export default connect(null, { filterProducts, resetListProducts })(FilteredProducts);

