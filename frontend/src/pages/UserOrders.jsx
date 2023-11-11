import React from "react";
import { useGetUserOrdersQuery } from "../slices/orderApiSlice";
import { OrderTable, Loader, ErrorComponent } from "../components/index";
export default function UserOrders() {
  const { data, isLoading, error } = useGetUserOrdersQuery();
  console.log(data);
  return isLoading ? (
    <Loader />
  ) : error ? (
    <ErrorComponent error={error} />
  ) : (
    <div className="container mx-auto">
      <div className="head my-10">
        <h1 className="text-primary text-3xl font-semibold ">Your Orders:</h1>
      </div>
      <OrderTable orders={data} />
    </div>
  );
}
