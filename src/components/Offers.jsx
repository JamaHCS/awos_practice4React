/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
// import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import Vigence from './Vigence';

import '../assets/css/components/Offers.scss';

const URL = 'http://localhost:8000/api/';

class Offers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offers: [],
      // insertModal: false,
      // form: {
      //   product_id: '',
      //   price: '',
      //   existence: '',
      //   vigence: '',
      // },
    };
  }

  componentDidMount() {
    const script = document.createElement('script');

    script.src = 'https://kit.fontawesome.com/fe02ebbd3b.js';
    script.async = true;

    document.body.appendChild(script);

    this.getOffers();
  }

  // handleChange = async (e) => {
  //   e.persist();
  //   await this.setState({
  //     form: {
  //       ...this.state.form,
  //       [e.target.name]: e.target.value,
  //     },
  //   });
  //   console.log(this.state.form);
  // };

  // changeModalState = () => {
  //   this.setState({ insertModal: !this.state.insertModal });
  // };

  getOffers = () => {
    fetch(`${URL}offers/`)
      .then((response) => response.json())
      .then((response) => this.setState({ offers: response }));
  };

  destroyOffer = (id) => {
    console.log('Initial state: ');
    console.log(this.state.offers);

    let array = this.state.offers.slice();
    let index = null;

    array.map((offer) => {
      if (id == offer.id) {
        index = array.indexOf(offer);
      }
      return null;
    });

    this.petitionToDestroy(id);

    array.splice(index, 1);

    this.setState({ offers: array });
    console.log(`After elimination of id ${id}: `);
    console.log(array);
  };

  petitionToDestroy = (id) => {
    let httpStatus = 400;

    fetch(`${URL}offers/destroy/${id}`).then((response) => {
      if (response.status == 204) {
        httpStatus = response.status;
        console.log(httpStatus);
        console.log('Offer deleted correctly.');
        return response.text();
      }
      return null;
    });

    console.log(httpStatus);
    return httpStatus;
  };

  render() {
    return (
      <div className="row">
        <h4>Promociones</h4>
        {/* <button
          type="button"
          className="btn btn-primary ml-auto"
          onClick={() => this.changeModalState()}
        >
          Agregar promoción
        </button> */}
        <table className="table mt-4">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Producto</th>
              <th scope="col">Tipo</th>
              <th scope="col">Precio</th>
              <th scope="col">Existencia</th>
              <th scope="col" colSpan="2">
                Vigencia
              </th>
              <th scope="col">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {this.state.offers.map((offer) => {
              return (
                <tr key={offer.id}>
                  <th scope="row">{offer.id}</th>
                  <td>{offer.product.name}</td>
                  <td>{offer.product.type.description}</td>
                  <td>${offer.price}</td>
                  <td>{offer.existence}</td>
                  <td colSpan="2">
                    <Vigence vigence={offer.vigence} url={URL} id={offer.id} />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => this.destroyOffer(offer.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* <Modal isOpen={this.state.insertModal} className="modal-insert">
          <ModalHeader>
            <button type="button" className="close">
              <span onClick={() => this.changeModalState()}>&times;</span>
            </button>
          </ModalHeader>
          <ModalBody className="modal-insert">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="product_id">
                  Producto:
                  <select
                    id="product_id"
                    className="form-control"
                    name="product_id"
                    required
                    onChange={this.handleChange}
                  >
                    <option>Selecciona...</option>
                  </select>
                </label>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="type_product">
                  Tipo de producto:
                  <input
                    type="text"
                    name="type_product"
                    id="type_product"
                    className="form-control"
                    disabled
                  />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="price">
                  Precio:
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </label>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="existence">
                  Existencia
                  <input
                    type="number"
                    name="existence"
                    id="existence"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </label>
              </div>
              <div className="form-group d-flex col-md-4">
                <div className="form-check my-auto mx-md-auto">
                  <label className="form-check-label" htmlFor="vigence">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="1"
                      id="vigence"
                      onChange={this.handleChange}
                      name="vigence"
                    />
                    Vigente
                  </label>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="modal-insert">
            <button type="submit" className="btn btn-primary">
              Agregar oferta
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => this.changeModalState()}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
         */}
      </div>
    );
  }
}

export default Offers;
