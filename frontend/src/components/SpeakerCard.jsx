import React from "react";
import { Link } from "react-router-dom";

const SpeakerCard = ({ speaker }) => {
  return (
    <Link
      to={`/speakers/${speaker._id}`}
      className="flex md:w-full m-auto my-5"
    >
      <div className="card sm:w-96 md:w-full bg-base-100 shadow-xl ">
        <figure className="px-10 pt-10 h-3/4">
          <img
            src={speaker.imageUrl}
            alt="Shoes"
            className="rounded-xl h-full object-contain  w-full"
          />
        </figure>
        <div className="card-body items-center text-center ">
          <h2 className="card-title">{speaker.name}</h2>
          <p className="break-words">{speaker.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default SpeakerCard;
