/* eslint-disable camelcase */
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

      offerToUpdate: null,
      product_id: 0,
      price: 0,
      existence: 0,
    };
  }

  // eslint-disable-next-line consistent-return
  setOffer = () => {
    let url = '';
    if (this.state.offerToUpdate == null) {
      console.log('its gonna be a store');
      url = `${URL}offers/store`;
    } else {
      console.log('its gonna be an update');
      url = `${URL}offers/update/${this.state.offerToUpdate.id}`;
    }

    let data = new FormData();
    data.append('product_id', this.state.product_id);
    data.append('price', this.state.price);
    data.append('existence', this.state.existence);

    console.log(data);

    fetch(url, {
      method: 'POST',
      // mode: 'no-cors',
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      body: data,
    })
      .catch((e) => console.log(`error:${e}`))
      .then((response) => {
        // console.log(response);
        if (response.status == 201) {
          return response.json();
        }
        return false;
      })
      .then((response) => {
        console.log(response);

        this.changeModalState();
        this.resetFormState();
        this.getData();
      });
  };

  getOffer = (id) => {
    fetch(`${URL}offers/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        this.changeModalState();
        this.setState({
          offerToUpdate: response,
          product_id: response.product.id,
          price: response.price,
          existence: response.existence,
          productType: response.product.type.description,
        });
      });
  };

  handleFormChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    // console.log(event.target);
    // console.log(this.state);
  };

  handleSelectChange = (event) => {
    this.getProductType(event.target.value);
    this.setState({ product_id: event.target.value });
  };

  componentDidMount() {
    const script = document.createElement('script');

    script.src = 'https://kit.fontawesome.com/fe02ebbd3b.js';
    script.async = true;

    document.body.appendChild(script);

    this.getData();
  }

  resetFormState = () => {
    this.setState({
      productType: 'Selecciona un producto.',

      offerToUpdate: null,
      product_id: 0,
      price: 0,
      existence: 0,
    });
  };

  changeModalState = () => {
    this.setState({ insertModal: !this.state.insertModal });
    if (this.state.insertModal) {
      this.resetFormState();
    }
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
                      className="btn btn-warning"
                      onClick={() => this.getOffer(offer.id)}
                    >
                      Editar
                    </button>
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
        <p>
          Producto: {this.state.product_id} <br />
          Precio: {this.state.price} <br />
          Existencia: {this.state.existence} <br />
        </p>
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
                          if (product.id == this.state.product_id) {
                            return (
                              <option
                                key={product.id}
                                selected
                                value={product.id}
                              >
                                {product.name}
                              </option>
                            );
                          }
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
                  <div className="form-group col-lg-3">
                    <label htmlFor="price">
                      Precio:
                      <input
                        type="number"
                        name="price"
                        id="price"
                        value={this.state.price}
                        className="form-control"
                        onChange={this.handleFormChange}
                        required
                      />
                    </label>
                  </div>
                  <div className="form-group col-lg-3">
                    <label htmlFor="existence">
                      Existencia
                      <input
                        type="number"
                        name="existence"
                        id="existence"
                        className="form-control"
                        value={this.state.existence}
                        onChange={this.handleFormChange}
                        required
                      />
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => this.setOffer()}
            >
              {this.state.offerToUpdate != null && (
                <span>Actualizar oferta</span>
              )}

              {this.state.offerToUpdate == null && <span>Agregar oferta</span>}
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
