import React, { Component } from "react";
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';
import {
  Collapse, Navbar, NavbarToggler, Nav, NavItem,
  NavLink, UncontrolledDropdown, DropdownToggle,
  DropdownMenu, DropdownItem
} from 'reactstrap';
import "./navigation_styles.css";

class Navigation extends Component {

  state = {
    isOpen: false
  };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {

    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Nav className="m-auto" navbar>
        <NavItem>
          <NavLink className="navlink" href="/">List Products</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="navlink" href="/create">Create a Product</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="navlink" href="#">My shopping</NavLink>
        </NavItem>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle className="navlink" nav caret>
            {user ? user.username : null}
          </DropdownToggle>
          <DropdownMenu className="dropdown_menu" right>
            <DropdownItem className="dropdown_item">
              <NavLink className="navlink" href={ user ? `/userProducts/`+user._id : "#"}>My Products</NavLink>
            </DropdownItem>
            <DropdownItem className="dropdown_item">
              <NavLink className="navlink" href="#">Change Password</NavLink>
            </DropdownItem>
            <DropdownItem className="dropdown_item">
              <NavLink className="navlink" href="#" onClick={this.props.logout}>Logout</NavLink>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    );

    const guestLinks = (
      <Nav className="m-auto" navbar>
        <NavItem>
          <NavLink className="navlink" href="/">List Products</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="navlink" href="/register">Create a Acount</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="navlink" href="/login">Login</NavLink>
        </NavItem>
      </Nav>
    );

    return (
      <div>
        <Navbar className="navbar" expand="md" light>
          <NavbarToggler className="navbar_toggler" onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {isAuthenticated ? authLinks : guestLinks}
          </Collapse>
        </Navbar>
      </div >

    );
  }
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navigation);

