import OrderTable from "./OrderTable";

export default function OrdersFlex({ orders }) {
  return (
    <>
      <h1>Your Orders</h1>
      <div className="orders-flex">
        {orders.map((order, index) => (
          <OrderTable key={index} order={order} />
        ))}
      </div>
    </>
  );
}
