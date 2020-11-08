/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import Vigence from './Vigence';

import '../assets/css/components/Offers.scss';

const URL = 'http://localhost:8000/api/';

class Offers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offers: [],
      insertModal: false,
      products: [],
      productType: 'Selecciona un producto.',
      form: {
        product_id: null,
        price: null,
        existence: null,
        vigence: 0,
      },
    };
  }

  handleFormChange = (event) => {
    this.setState({ form: { [event.target.name]: event.target.value } });
  };

  handleSelectChange = (event) => {
    this.getProductType(event.target.value);
    // console.log(this.state);
  };

  componentDidMount() {
    const script = document.createElement('script');

    script.src = 'https://kit.fontawesome.com/fe02ebbd3b.js';
    script.async = true;

    document.body.appendChild(script);

    this.getData();
  }

  changeModalState = () => {
    this.setState({ insertModal: !this.state.insertModal });
  };

  getData = () => {
    fetch(`${URL}offers/`)
      .then((response) => response.json())
      .then((response) => this.setState({ offers: response }));

    fetch(`${URL}products/`)
      .then((response) => response.json())
      .then((response) => this.setState({ products: response }));
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

  getProductType = (id) => {
    console.log(id);
    fetch(`${URL}getType/${id}`)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ productType: response[0].description });
        // console.log(response[0].description);
      });

    return true;
  };

  render() {
    return (
      <div className="row">
        <h4>Promociones</h4>
        <button
          type="button"
          className="btn btn-primary ml-auto"
          onClick={() => this.changeModalState()}
        >
          Agregar promoción
        </button>
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

        <Modal isOpen={this.state.insertModal} size="lg" backdrop="static">
          <ModalHeader>
            <button type="button" className="close">
              <span onClick={() => this.changeModalState()}>&times;</span>
            </button>
          </ModalHeader>
          <ModalBody>
            <div className="create-container">
              <form className="mt-5">
                <div className="form-row">
                  <div className="form-group col-lg-3">
                    <label htmlFor="product_id">
                      Producto:
                      <select
                        id="product_id"
                        className="form-control"
                        name="product_id"
                        onChange={this.handleSelectChange}
                        required
                      >
                        <option>Selecciona...</option>
                        {this.state.products.map((product) => {
                          return (
                            <option key={product.id} value={product.id}>
                              {product.name}
                            </option>
                          );
                        })}
                      </select>
                    </label>
                  </div>
                  <div className="form-group col-lg-3">
                    <label htmlFor="type_product">
                      Tipo de producto:
                      <input
                        type="text"
                        name="type_product"
                        id="type_product"
                        className="form-control"
                        value={this.state.productType}
                        disabled
                      />
                    </label>
                  </div>
                  <div className="form-group col-lg-2">
                    <label htmlFor="price">
                      Precio:
                      <input
                        type="number"
                        name="price"
                        id="price"
                        className="form-control"
                        required
                      />
                    </label>
                  </div>
                  <div className="form-group col-lg-2">
                    <label htmlFor="existence">
                      Existencia
                      <input
                        type="number"
                        name="existence"
                        id="existence"
                        className="form-control"
                        min="1"
                        pattern="^[0-9]+"
                        required
                      />
                    </label>
                  </div>
                  <div className="form-group d-flex col-lg-2">
                    <div className="form-check my-auto mx-md-auto">
                      <label className="form-check-label" htmlFor="vigence">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="1"
                          id="vigence"
                          name="vigence"
                        />
                        Vigente
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </ModalBody>
          <ModalFooter>
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
      </div>
    );
  }
}

export default Offers;
