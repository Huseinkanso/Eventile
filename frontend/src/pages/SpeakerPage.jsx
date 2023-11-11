import { useParams } from "react-router-dom";
import { FaLinkedin, FaMeetup, FaTwitter } from "react-icons/fa";
import { Loader, ErrorComponent, EventCard } from "../components";
import { useGetSpeakerByIdQuery } from "../slices/userApiSlice";
const EventPage = () => {
  const { id: speakerId } = useParams();
  const { data: speaker, isLoading, error } = useGetSpeakerByIdQuery(speakerId);
  console.log(speaker);
  return isLoading ? (
    <Loader />
  ) : error ? (
    <ErrorComponent error={error} />
  ) : (
    // display all info of the speaker with picture take 50% of the screen and the other 50% is the info
    <div className="container mx-auto mt-20 min-h-screen ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="m-4">
          <figure>
            <img
              src={speaker.imageUrl}
              alt={speaker.name}
              className="rounded-t-lg w-full h-full"
            />
          </figure>
        </div>
        <div className="m-4">
          <h2 className="text-3xl font-bold">{speaker.name}</h2>
          <p className="text-sm">{speaker.description}</p>
          <div className="">
            <div className="justify-between  card-actions my-4">
              <span className="badge badge-ghost">{speaker.company}</span>
              <span className="badge badge-ghost">{speaker.position}</span>
            </div>
            <div className="justify-between   card-actions my-4 py-4">
              <FaTwitter className="w-7 h-7" />{" "}
              <a
                href={speaker.twitter}
                target="_blank"
                className="btn btn-info"
              >
                My Twitter
              </a>
            </div>
            <div className="justify-between   card-actions my-4 py-4">
              <FaLinkedin className="w-7 h-7" />{" "}
              <a
                href={speaker.linkedin}
                target="_blank"
                className="btn bg-blue-700"
              >
                My Linkedin
              </a>
            </div>
            <div className="justify-between   card-actions my-4 py-4">
              <FaMeetup className="w-7 h-7" />{" "}
              <a
                href={speaker.website}
                target="_blank"
                className="btn btn-warning"
              >
                My Website
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="my-10 events">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <ErrorComponent error={error} />
        ) : (
          <div className="mx-auto mt-20 min-h-screen">
            <div className="head my-10">
            <h1 className="text-primary text-3xl font-semibold ">Events:</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {speaker &&
                speaker.events &&
                speaker.events.map((event, i) => (
                  <EventCard event={event} key={i} />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventPage;
