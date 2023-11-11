import { Link } from "react-router-dom";
const EventCard = ({ event }) => {
  return (
    <Link to={`/event/${event._id}`} className=' flex md:w-full w-3/4 m-auto my-5'>
      <div className="card sm:w-96 md:w-full bg-base-100 shadow-xl ">
        <figure className="px-10 pt-10 h-3/4">
          <img
            src={event.imageUrl}
            alt="Shoes"
            className="rounded-xl h-full object-contain  w-full"
          />
        </figure>
        <div className="card-body items-center text-center ">
        <h2 className="card-title">{event.name}</h2>
          <p className="text-sm">{event.description}</p>
          <div className="justify-between card-actions">
            <span className="badge badge-ghost">{event.category}</span>
            <span className="badge badge-ghost">{new Date(event.date).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
