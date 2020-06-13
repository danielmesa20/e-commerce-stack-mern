import React, { Component } from 'react'
import Loader from 'react-loader-spinner'

class Loading extends Component {
    render() {
        return (
            <div className="mx-auto my-5">
                <Loader
                    type="Puff"
                    color="#32E0C4"
                    height={100}
                    width={100}
                />
            </div>
        )
    }
}

export default Loading;