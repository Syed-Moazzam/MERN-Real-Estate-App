import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/listing/:listingId" element={<Listing />} />

        <Route path='/sign-up' element={<ProtectedRoute path='/sign-up' component={SignUp} />} />
        <Route path='/sign-in' element={<ProtectedRoute path='/sign-in' component={Signin} />} />
        <Route path='/profile' element={<ProtectedRoute path='/profile' component={Profile} />} />
        <Route path='/create-listing' element={<ProtectedRoute path='/create-listing' component={CreateListing} />} />
        <Route path='/update-listing/:listingId' element={<ProtectedRoute path='/update-listing/:listingId' component={UpdateListing} />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
