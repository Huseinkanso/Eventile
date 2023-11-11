import { Route, createBrowserRouter,createRoutesFromElements } from "react-router-dom";
import { HomePage,EventPage,SignInPage, SpeakerProfile, SpeakersPage, SpeakerPage, SpeakerEvents, CreateEvent, EditEvent, UserOrders } from "./pages";
import App from "./App";
import RegisterPage from "./pages/RegisterPage";
import { PrivateComponent, SpeakerComponent } from "./components";
import UserProfile from "./pages/UserProfile";


const router= createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />} >
            <Route index="true" path="/" element={<HomePage/>} />
            <Route  path="/events/:pageNumber" element={<HomePage/>} />
            <Route  path="/events/:pageNumber/search/:keyword" element={<HomePage/>} />

            <Route path="/signin" element={<SignInPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/event/:id" element={<EventPage/>} />

            <Route path="/speakers/:id" element={<SpeakerPage/>} />
            <Route path="/speakers" element={<SpeakersPage/>} />
            <Route path="/speakers" element={<SpeakersPage/>} />
            <Route path="/speakers/:pageNumber" element={<SpeakersPage/>} />
            <Route path="/speakers/:pageNumber/search/:keyword" element={<SpeakersPage/>} />


            
            <Route path="" element={<PrivateComponent/>}>
                <Route path="/profile" element={<UserProfile/>} />
                <Route path="/orders" element={<UserOrders/>} />
            </Route>

            <Route path="" element={<SpeakerComponent/>}>
                <Route path="/speaker/profile" element={<SpeakerProfile/>} />
                <Route path="/speaker/events" element={<SpeakerEvents/>} />
                <Route path="/speaker/events/create" element={<CreateEvent/>} />
                <Route path="/speaker/events/:id/edit" element={<EditEvent/>} />
            </Route>
        </Route>
    )
)

export default router;