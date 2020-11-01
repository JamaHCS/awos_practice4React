import React from 'react';
import useScript from '../hooks/useScript';

import '../assets/css/components/Offers.scss';

const Body = () => {
  useScript('https://kit.fontawesome.com/fe02ebbd3b.js');

  return (
    <>
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
          <tr>
            <th scope="row">10</th>
            <td>Gomitas</td>
            <td>Gamesa</td>
            <td>$10</td>
            <td>500</td>
            <td>
              <i className="fas fa-times" />
            </td>
            <td>
              <a className="btn btn-warning" href="www.google.com">
                Editar
              </a>
            </td>
            <td>
              <form action="" method="POST">
                <button className="btn btn-danger" type="submit">
                  Eliminar
                </button>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Body;
