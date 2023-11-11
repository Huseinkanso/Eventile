import React from "react";
import { useGetSpeakerEventsQuery } from "../../slices/eventApiSlice";
import {
  Loader,
  ErrorComponent,
  EventCard,
  MessageComponent,
} from "../../components";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
const SpeakerEvents = () => {
  const { data, isLoading, error } = useGetSpeakerEventsQuery();
  console.log(data);
  return isLoading ? (
    <Loader />
  ) : error ? (
    <ErrorComponent error={error} />
  ) : (
    <div className="mx-auto mt-20 min-h-screen">
      <div className="heading flex justify-between container mx-auto my-5">
        <h1 className="text-primary text-3xl font-semibold ">Your Events</h1>
        <Link to='/speaker/events/create' className="btn btn-primary"><FaPlus/> Create new Event</Link>
      </div>
      {data && data.length === 0 ? (
        <MessageComponent message={"no event found"} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((event, i) => (
              <EventCard event={event} key={i} />
            ))}
        </div>
      )}
    </div>
  );
};

export default SpeakerEvents;
