/* eslint-disable eqeqeq */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

import '../assets/css/components/Vigence.scss';

class Vigence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vigence: this.props.vigence,
    };
  }

  changeVigenceState = () => {
    this.setState({ vigence: !this.state.vigence });
    fetch(`${this.props.url}vigence/${this.props.id}`)
      .then((response) => {
        if (response.status == 201) {
          console.log('Vigence changed correctly.');
          return response.text();
        }
        alert('Was an exception in the petition. Please, check the console.');
        return null;
      })
      .then((response) => {
        console.log(JSON.parse(response));
      });
  };

  render() {
    if (this.state.vigence == 1) {
      return (
        <div className="vigence-container">
          <i className="fas fa-check fa-lg" />
          <button
            type="button"
            className="btn mr-4"
            onClick={() => this.changeVigenceState()}
          >
            <i className="fas fa-toggle-on fa-2x" />
          </button>
        </div>
      );
    }
    return (
      <div className="vigence-container">
        <i className="fas fa-times fa-lg" />
        <button
          type="button"
          className="btn mr-4"
          onClick={() => this.changeVigenceState()}
        >
          <i className="fas fa-toggle-off fa-2x" />
        </button>
      </div>
    );
  }
}

export default Vigence;
