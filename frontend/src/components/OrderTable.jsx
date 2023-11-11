import React from "react";
import { FaCheck, FaTimes, FaUserCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDownloadTicketMutation } from "../slices/orderApiSlice";
import { toast } from "react-toastify";
import LoaderButton from "./LoaderButton";

const OrderTable = ({ orders }) => {
  const dateFormat=new Intl.DateTimeFormat("en-US", {
    weekday: "long", // long weekday name, e.g. "Monday"
    day: "numeric", // day of the month, e.g. "1"
    month: "long", // long month name, e.g. "January"
    year: "numeric", // year, e.g. "2022"
    hour: "2-digit", // hour, e.g. "01"
    minute: "2-digit", // minute, e.g. "30"
    hour12: true, // use 12-hour time
  });
  const [downloadTicket,{isLoading,error}]=useDownloadTicketMutation()
  const handleDownloadTicket=async(id)=>{
    try {
      await downloadTicket(id).unwrap();
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error || "error downloading ticket")
    }
  }
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="capitalize">
            <th>Event Name</th>
            <th>ticket price</th>
            <th>date</th>
            <th>status</th>
            <th>is Paid</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => (
            <tr key={i}>
              <th>{order.event.name}</th>
              <td>{order.totalPrice}</td>
              <td>
                {dateFormat.format(new Date(order.event.date))}
              </td>
              <td>
                {new Date() > new Date(order.event.date) ? (
                  <button className="btn btn-danger">passed event</button>
                ) : (
                  <button className="btn btn-success">still available</button>
                )}
              </td>
              <td>{order.isPaid ? <FaCheck /> : <FaTimes />}</td>
              <td className="flex gap-4 items-center justify-center flex-wrap">
                <Link
                  to={`/event/${order.event._id}`}
                  className="btn btn-primary"
                >
                  See Event
                </Link>
                {order.isPaid && new Date() < new Date(order.event.date) && (
                  <button className="btn btn-secondary" onClick={()=>handleDownloadTicket(order._id)}>
                    {isLoading ? <LoaderButton/> :'Download Your Ticket'}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
