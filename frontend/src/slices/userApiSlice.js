import { USER_URL } from '../constants';
import ApiSlice from './apiSlice';

export const userApiSlice = ApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: `${USER_URL}/login`,
                method: 'POST',
                body: credentials
            })
        }),
        registerUser: builder.mutation({
            query: (credentials) => ({
                url: `${USER_URL}/registerUser`,
                method: 'POST',
                body: credentials
            })
        }),
        registerSpeaker: builder.mutation({
            query: (credentials) => ({
                url: `${USER_URL}/registerSpeaker`,
                method: 'POST',
                body: credentials
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USER_URL}/logout`,
                method: 'POST'
            })
        }),
        uploadImage:builder.mutation({
            query:(image)=>({
                url: `/api/uploads`,
                method: 'POST',
                body: image,
            })
        }),
        updateUserProfile: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/profile`,
                method: 'PUT',
                body: data
            })
        }),
        updateSpeakerProfile: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/speaker/profile`,
                method: 'PUT',
                body: data
            })
        }),
        getUserProfile: builder.query({
            query: () => ({
                url: `${USER_URL}/profile`,
                method: 'GET'
            })
        }),
        getSpeakers: builder.query({
            query: ({pageNumber,keyword}) => ({
                url: `${USER_URL}/speakers`,
                method: 'GET',
                params: {pageNumber,keyword}
            })
        }),
        getSpeakerById: builder.query({
            query: (id) => ({
                url: `${USER_URL}/speakers/${id}`,
                method: 'GET'
            })
        }),
    })
        
})

export const {useLoginMutation,useRegisterSpeakerMutation,useRegisterUserMutation,useLogoutMutation,useUploadImageMutation,useGetUserProfileQuery,useUpdateSpeakerProfileMutation,useUpdateUserProfileMutation,useGetSpeakersQuery,useGetSpeakerByIdQuery} =userApiSlice;