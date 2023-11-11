import { useParams } from "react-router-dom";
import {
  ErrorComponent,
  Loader,
  MessageComponent,
  PaginateSpeaker,
  SearchSpeaker,
} from "../components";
import SpeakerCard from "../components/SpeakerCard";
import { useGetSpeakersQuery } from "../slices/userApiSlice";

const SpeakersPage = () => {
  const params = useParams();
  const pageNumber = params.pageNumber || 1;
  const keyword = params.keyword || "";
  const { data, isLoading, error } = useGetSpeakersQuery({
    pageNumber,
    keyword,
  });
  return isLoading ? (
    <Loader />
  ) : error ? (
    <ErrorComponent error={error} />
  ) : (
    <div className="mx-auto my-20 min-h-screen container ">
      <SearchSpeaker />
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-10 ">
        {data &&
          data.speakers.map((speaker, i) => (
            <SpeakerCard speaker={speaker} key={i} />
          ))}
      </div>
      {data.speakers.length !== 0 ? (
        <PaginateSpeaker
          page={data.page}
          pages={data.pages}
          keyword={keyword}
        />
      ) : (
        <MessageComponent
          message={`No speakers ${keyword && "for " + keyword}`}
        />
      )}
    </div>
  );
};

export default SpeakersPage;
