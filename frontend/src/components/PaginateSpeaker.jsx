import { Link } from "react-router-dom";

const PaginateSpeaker = ({ page, pages, keyword, isAdmin }) => {
  const previews = page - 1 !== 0 ? page - 1 : 0;
  const next = page + 1 !== pages + 1 ? page + 1 : pages;

  return (
    <div className="join my-4">
      <Link
        to={
          isAdmin
            ? keyword
              ? `/admin/events/${previews}/search/${keyword}`
              : `/admin/events/${previews}`
            : keyword
            ? `/events/${previews}/search/${keyword}`
            : `/events/${previews}`
        }
        className="join-item btn"
        disabled={previews == 0}
      >
        «
      </Link>
      <button className="join-item btn">Page {page}</button>
      <Link
        className="join-item btn"
        disabled={page == pages}
        to={
          isAdmin
            ? keyword
              ? `/admin/speakers/${next}/search/${keyword}`
              : `/admin/speakers/${next}`
            : keyword
            ? `/speakers/${next}/search/${keyword}`
            : `/spealers/${next}`
        }
      >
        »
      </Link>
    </div>
  );
};
export default PaginateSpeaker;
