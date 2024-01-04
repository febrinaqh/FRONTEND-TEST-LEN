// FloatingButton.js
import React, { Component } from 'react';
import CoordinateConverterForm from './CoordinateConverterForm';
import './components.css';

class FloatingButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showConverterForm: false,
        };
    }

    handleButtonClick = () => {
        this.setState({ showConverterForm: true });
    }

    handleFormClose = () => {
        this.setState({ showConverterForm: false });
    }

    render() {
        return (
            <div>
                <button className="floating-button" onClick={this.handleButtonClick}>
                    +
                </button>

                {this.state.showConverterForm && (
                    <CoordinateConverterForm onClose={this.handleFormClose} />
                )}
            </div>
        );
    }
}

export default FloatingButton;

