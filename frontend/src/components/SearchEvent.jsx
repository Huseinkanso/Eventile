import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SearchEvent = ({isAdmin,isSpeaker}) => {
  const [search, setSearch] = useState("");
  const navigate=useNavigate();
  const params=useParams();
  const page=params.pageNumber || 1;
  const handleSearch = (e) => {
      if(search.trim().length===0)
      {
        navigate(isSpeaker ? `/speaker/events/${page}` : isAdmin ? `/admin/events/${page}` : `/events/${page}`)
      }else 
      {
        navigate(isSpeaker ? `/speaker/events/${page}/search/${search}` : isAdmin ? `/admin/events/${page}/search/${search}` : `/events/${page}/search/${search}`)
      }
    setSearch("")
  };
  return (
    <div className="search justify-end flex gap-4">
      <input
        type="text"
        placeholder="Event Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input input-bordered input-primary w-50"
      />
      <button className="btn btn-primary" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchEvent;
