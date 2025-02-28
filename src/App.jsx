import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

//import Pages
import Home from "./pages/Home/Home";
import Stream from "./pages/Stream/Stream";
import View from "./components/ViewAnime/View";
import Filter from "./pages/Search/Filter";
import Login from "./auth/Login/Login";
import Signup from "./auth/Signup/Signup";
import Profile from "./pages/Profile/Profile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" index element={<Home />} />
      <Route path="/auth/login" index element={<Login />} />
      <Route path="/auth/signup" index element={<Signup />} />     
      <Route path="/profile" element={<Profile />} />
      <Route path="/anime/:id" element={<View />} />
      <Route path="/search/keyword/:searchQuery" element={<Filter />} />
      <Route path="/watch/:watchId" element={<Stream />} />
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
