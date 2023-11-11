import apiSlice from "./apiSlice";
import { ORDER_URL } from "../constants";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserOrders: builder.query({
      query: () => `${ORDER_URL}/myorders`,
    }),
    downloadTicket: builder.mutation({
      query: (orderId) => ({
        url: `${ORDER_URL}/${orderId}/downloadTicket`,
        method: "POST",
        responseHandler: (response)=>response.blob()
      }),
    }),
  }),
});

export const { useGetUserOrdersQuery, useDownloadTicketMutation } = orderApiSlice;
