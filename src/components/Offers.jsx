/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import Vigence from './Vigence';

import '../assets/css/components/Offers.scss';

const URL = 'http://localhost:8000/api/';

class Offers extends Component {
  constructor(props) {
    super(props);
    this.state = { offers: [] };
  }

  componentDidMount() {
    const script = document.createElement('script');

    script.src = 'https://kit.fontawesome.com/fe02ebbd3b.js';
    script.async = true;

    document.body.appendChild(script);

    this.getOffers();
  }

  getOffers = () => {
    fetch(`${URL}offers/`)
      .then((response) => response.json())
      .then((response) => this.setState({ offers: response }));
    // .then((response) => console.log(response));
  };

  render() {
    return (
      <div className="row">
        <h4>Promociones</h4>
        <a href="www.google.com" className="btn btn-primary ml-auto">
          Agregar promoción
        </a>
        <table className="table mt-4">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Producto</th>
              <th scope="col">Tipo</th>
              <th scope="col">Precio</th>
              <th scope="col">Existencia</th>
              <th scope="col">Vigencia</th>
              <th scope="col">&nbsp;</th>
              <th scope="col">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {this.state.offers.map((offer) => {
              return (
                <tr>
                  <th scope="row">{offer.id}</th>
                  <td>{offer.product.name}</td>
                  <td>{offer.product.type.description}</td>
                  <td>${offer.price}</td>
                  <td>{offer.existence}</td>
                  <td>
                    <Vigence vigence={offer.vigence} />
                  </td>
                  <td>
                    <button type="button" className="btn btn-warning">
                      Editar
                    </button>
                  </td>
                  <td>
                    <button type="button" className="btn btn-danger">
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Offers;
