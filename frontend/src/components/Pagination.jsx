import { Link } from "react-router-dom";

 const Pagination = ({ page, pages, isSpeaker, keyword, isAdmin }) => {
  const previews = page - 1 !== 0 ? page - 1 : 0;
  const next = page + 1 !== pages+1 ? page + 1 : pages;

  return (
    <div className="join my-4">
      <Link
        to={
          isSpeaker ? keyword ? `/speaker/events/${previews}/search/${keyword}` : `/speaker/events/${previews}`
            : isAdmin ? keyword ? `/admin/events/${previews}/search/${keyword}` : `/admin/events/${previews}`
            : keyword ? `/events/${previews}/search/${keyword}`: `/events/${previews}`
        }
        className="join-item btn"
        disabled={previews == 0}
      >
        «
      </Link>
      <button className="join-item btn">Page {page}</button>
      <Link
        className="join-item btn"
        disabled={page==pages}
        to={
            isSpeaker ? keyword ? `/speaker/events/${next}/search/${keyword}` : `/speaker/events/${next}`
            : isAdmin ? keyword ? `/admin/events/${next}/search/${keyword}` : `/admin/events/${next}`
            : keyword ? `/events/${next}/search/${keyword}`: `/events/${next}`
        }
      >
        »
      </Link>
    </div>
  );
};
export default Pagination;