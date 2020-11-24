import React from "react";

function Employees() {
  return (
    <div className="employees">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Employees Name</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Sales</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {/* {productList.map(({ id, data: { name, price } }) => (
            <tr key={id}>
              <td></td>
              <td>{name}</td>
              <td>{price}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
}

export default Employees;
