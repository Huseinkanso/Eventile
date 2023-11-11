import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaDollarSign, FaLocationArrow, FaTicketAlt } from "react-icons/fa";
import {
  useBuyTicketMutation,
  useDeleteEventMutation,
  useGetEventQuery,
} from "../slices/eventApiSlice";
import { Loader, ErrorComponent } from "../components";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";

const EventPage = () => {
  const {id:eventId} = useParams();
  const location=useLocation();
  const success=location.search ? location.search.split("=")[1] : null;
  const { data: event, isLoading, error } = useGetEventQuery(eventId);
  const navigate = useNavigate();
  const [deleteEvent, { isLoading: loadingDelete }] = useDeleteEventMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [buyTicket,{isLoading:loadingTicket,error:errorTicket}] = useBuyTicketMutation();
  useEffect(()=>{
    if(success)
    {
      toast.success("ticket bought successfully,see your order");
      navigate("/orders");
    }
  },[success])
  const handleDelete = async () => {
    if (window.confirm("are you sure you want to delete this event?")) {
      try {
        await deleteEvent(eventId);
        toast.success("event deleted successfully");
        navigate("/speaker/events");
      } catch (error) {
        toast.error(
          error?.data?.message || error.error || "error deleting event"
        );
      }
    }
  };
  
  const handleCheckout = async() => {
    try {
      const res=await buyTicket(eventId).unwrap();
      if(res.url)
      {
        window.location.href=res.url;
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error || "error buying ticket")
    }
  }
  return isLoading || loadingDelete ? (
    <Loader />
  ) : error ? (
    <ErrorComponent error={error} />
  ) : (
    // display all info of the event with picture take 50% of the screen and the other 50% is the info
    <div className="container mx-auto mt-20 min-h-screen ">
      <div className="edit">
        {userInfo &&
          userInfo.type == "speaker" &&
          userInfo._id === event.speaker && (
            <div className="flex gap-3">
              <Link
                to={`/speaker/events/${event._id}/edit`}
                className="btn btn-warning"
              >
                Edit
              </Link>
              <button className="btn btn-error" onClick={handleDelete}>
                delete
              </button>
            </div>
          )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="m-4">
          <figure>
            <img
              src={event.imageUrl}
              alt={event.name}
              className="rounded-t-lg"
            />
          </figure>
        </div>
        <div className="m-4">
          <h2 className="text-3xl font-bold">{event.name}</h2>
          <p className="text-sm break-words">{event.description}</p>
          <div className="justify-between  card-actions my-4">
            <span className="badge badge-ghost">{event.category}</span>
            <span className="badge badge-ghost">{new Date(event.date).toLocaleString()}</span>
          </div>
          <div className="justify-between   card-actions my-4 py-4">
            <FaLocationArrow className="w-7 h-7" /> {event.address}
          </div>
          <div className="justify-between   card-actions my-4 py-4">
            <FaTicketAlt className="w-7 h-7" />{" "}
            <span>
              {event.ticket_remaining != event.ticket_number && (
                <span className="line-through ">{event.ticket_number}</span>
              )}{" "}
              {event.ticket_remaining} remaining
            </span>
          </div>
          <div className="justify-between   card-actions my-4 py-4">
            <FaDollarSign className="w-7 h-7" /> {event.ticket_price}
          </div>
          <div>
            { new Date(event.date)>new Date() ?  <button className="btn btn-primary w-full text-center block" onClick={handleCheckout}>
              {loadingTicket ? <Loader /> : "Buy Ticket"}
            </button> : <button className="btn btn-secondary w-full text-center block" disabled>Passed Event</button>
            }
          </div>
        </div>
      </div>
      <div className="my-10 "></div>
    </div>
  );
};

export default EventPage;
