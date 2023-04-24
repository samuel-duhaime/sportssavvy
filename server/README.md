# Backend

## EndPoint

<table>
  <tr>
    <th>Method</th>
    <th>Endpoint</th>
    <th>Query or Body</th>
    <th>Return data</th>
  </tr>
  <tr>
   <td>GET</td>
    <td> /items </td>
    <td><strong>Query</strong><br/>category: string, array (optional)<br /> companyId: string, array (optional)<br /> bodyLocation: string, array (optional)<br /> limit: number (optional)<br /> sort: "priceUp", "priceDown" (optional)<br />price: string (optional)<br /> page: number (optional)</td>
    <td>[{name, price, body_location, category, _id, imageSrc, numInStock, companyId}] </td>
  </tr>
  <tr>
    <td>GET</td>
    <td> /item:itemId </td>
    <td></td>
    <td>{name, price, body_location, category, _id, imageSrc, numInStock, companyId}</td>
  </tr>
  <tr>
    <td>GET</td>
    <td> /user/:userId </td>
    <td></td>
    <td>{_id, firstName, imageSrc, isAdmin, cartItems, checkoutIds}</td>
  </tr>
  <tr>
    <td>GET</td>
    <td> /checkout/:checkoutId </td>
    <td></td>
    <td>{email, cardNumber, cardExpiration, cvc, country, zip, address}</td>
  </tr>
   <tr>
    <td>POST</td>
    <td> /checkout/:userId </td>
    <td><strong>Body</strong><br/> userId: string (required) <br/> email: string (required) <br/>cardNumber: number, 12 length (required)<br /> cardExpiration : MM/YY (required)<br />cvc: number, 3 length (required)<br /> country: string (required)<br />zip: string (required)<br /> address: string (required)              </td>
    <td>{checkoutId}</td>
  </tr>
  <tr>
    <td>Patch</td>
    <td> /user/:userId </td>
    <td><strong>Body</strong><br/>itemId: number (required)<br/>quantity: number (required) </td>
    <td>{cartItems}</td>
  </tr>
</table>
