import React, { Component } from 'react';

import '../assets/css/components/OfferForm.scss';

class OfferForm extends Component {
  componentDidMount() {
    const script = document.createElement('script');
    script.src = 'https://kit.fontawesome.com/fe02ebbd3b.js';
    script.async = true;
    document.body.appendChild(script);
  }

  render() {
    return (
      <div className="create-container">
        <form method="POST" action="www.google.com" className="mt-5">
          <div className="form-row">
            <div className="form-group col-lg-3">
              <label htmlFor="product_id">
                Producto:
                <select
                  id="product_id"
                  className="form-control"
                  name="product_id"
                  required
                >
                  <option>Selecciona...</option>
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
    );
  }
}

export default OfferForm;
