import {
  ErrorComponent,
  EventCard,
  Loader,
  MessageComponent,
  Pagination,
  SearchEvent,
} from "../components";
import { useGetEventsQuery } from "../slices/eventApiSlice";
import { useParams } from "react-router-dom";

const HomePage = () => {
  const params = useParams();
  const pageNumber = params.pageNumber || 1;
  const keyword = params.keyword || "";
  console.log(pageNumber, keyword);
  const { data, isLoading, error } = useGetEventsQuery({ pageNumber, keyword });

  return isLoading ? (
    <Loader />
  ) : error ? (
    <ErrorComponent error={error} />
  ) : (
    <div className="mx-auto mt-16 min-h-screen">
      <SearchEvent />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data &&
          data.events &&
          data.events.map((event, i) => <EventCard event={event} key={i} />)}
      </div>
      {data.events.length !== 0 && (
        <Pagination page={data.page} pages={data.pages} keyword={keyword} />
      )}
      {data.events.length == 0 && (
        <MessageComponent
          message={`No events ${keyword && "for " + keyword}`}
        />
      )}
    </div>
  );
};

export default HomePage;
