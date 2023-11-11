import { createApi ,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// using proxy no need
const baseQuery = fetchBaseQuery({});
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Events","Users"],
  endpoints: (build) => ({

  }),
});

export default apiSlice;