import React from 'react';
import useScript from '../hooks/useScript';

import '../assets/css/components/Create.scss';

const Create = () => {
  useScript('https://kit.fontawesome.com/fe02ebbd3b.js');

  return (
    <div className="create-container">
      <div className="row">
        <h4>Crear oferta</h4>
        <a href="www.google.com" className="btn btn-danger ml-auto">
          <i className="fas fa-angle-double-left mr-1" />
          Regresar
        </a>
      </div>
      <form method="POST" action="www.google.com" className="mt-5">
        <div className="form-row">
          <div className="form-group col-md-3">
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
          <div className="form-group col-md-3">
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
          <div className="form-group col-md-2">
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
          <div className="form-group col-md-2">
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
          <div className="form-group d-flex col-md-2">
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
        <button type="submit" className="btn btn-primary">
          Agregar oferta
        </button>
      </form>
    </div>
  );
};

export default Create;
