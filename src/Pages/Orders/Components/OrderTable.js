import { displayPrice } from "../../../Utils/utilFunctions";

export default function OrderTable({ order }) {
  return (
    <div className="order">
      <h2>Ordered On: {new Date(order.orderedAt).toLocaleDateString()}</h2>
      <table className="order-table">
        <thead>
          <th>Title</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total Price</th>
        </thead>
        <tbody>
          {order.items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>&#8377; {displayPrice(item.price)}</td>
              <td>{item.quantity}</td>
              <td>&#8377; {displayPrice(item.quantity * item.price)}</td>
            </tr>
          ))}
          <tr className="total-price">
            <td colSpan={4}>
              &#8377;{" "}
              {displayPrice(
                order.items.reduce(
                  (acc, curr) => acc + curr.quantity * curr.price,
                  0
                )
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
