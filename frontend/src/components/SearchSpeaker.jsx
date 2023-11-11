import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SearchSpeaker = ({isAdmin}) => {
  const [search, setSearch] = useState("");
  const navigate=useNavigate();
  const params=useParams();
  const page=params.pageNumber || 1;
  const handleSearch = (e) => {
      if(search.trim().length===0)
      {
        navigate(isAdmin ? `/admin/speakers/${page}` : `/speakers/${page}`)
      }else 
      {
        navigate(isAdmin ? `/admin/speakers/${page}/search/${search}` : `/speakers/${page}/search/${search}`)
      }
    setSearch("")
  };
  return (
    <div className="search sm:justify-end justify-center flex gap-4">
      <input
        type="text"
        placeholder="Speaker Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input input-bordered input-primary max-w-50"
      />
      <button className="btn btn-primary" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchSpeaker;
