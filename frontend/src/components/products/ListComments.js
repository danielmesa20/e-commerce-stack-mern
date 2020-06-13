import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Jumbotron } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ListComments extends Component {
    render() {
        return (
            <ListGroup>
                {
                    this.props.comments.length > 0
                        ? this.props.comments.map(comment => (
                            <ListGroupItem>{comment.body}</ListGroupItem>
                        ))
                        : <div className="row pt-4 mx-auto">
                            <Jumbotron className="jumbotron">
                                <h1 className="display-3">This product has no comments yet.</h1>
                            </Jumbotron>
                        </div>
                }
            </ListGroup>
        )
    }
}

ListComments.propTypes = {
    comments: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    comments: state.product.comments
});

export default connect(mapStateToProps)(ListComments);

