import apiSlice from "./apiSlice";
import { EVENT_URL } from "../constants";
export const eventApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getEvents:builder.query({
            query:({pageNumber,keyword})=>({
                url:EVENT_URL,
                method:'GET',
                params:{
                    pageNumber,
                    keyword
                }
            }),
            providesTags:['Event'],
            keepUnusedDataFor:5
        }),
        getEvent:builder.query({
            query:(id)=>({
                url:`${EVENT_URL}/${id}`,
                method:'GET'
            }),
            providesTags:['Event']
        }),
        getSpeakerEvents:builder.query({
            query:()=>({
                url:`${EVENT_URL}/speaker`,
                method:'GET'
            }),
            providesTags:['Event'],
            keepUnusedDataFor:5,
        }),
        createEvent:builder.mutation({
            query:(body)=>({
                url:EVENT_URL,
                method:'POST',
                body
            }),
        }),
        updateEvent:builder.mutation({
            query:(event)=>({
                url:`${EVENT_URL}/${event.eventId}`,
                method:'PUT',
                body:event
            }),
            invalidatesTags:['Event']
        }),
        deleteEvent:builder.mutation({
            query:(eventId)=>({
                url:`${EVENT_URL}/${eventId}`,
                method:'DELETE'
            }),
            invalidatesTags:['Event']
        }),
        buyTicket:builder.mutation({
            query:(eventId)=>({
                url:`${EVENT_URL}/${eventId}/checkout`,
                method:'POST'
            }),
        }),
    })
})

export const {useGetEventsQuery,useGetEventQuery,useGetSpeakerEventsQuery,useCreateEventMutation,useUpdateEventMutation,useDeleteEventMutation,useBuyTicketMutation} = eventApiSlice;