
import { Toaster } from "react-hot-toast";
import "./App.css";
import { Header } from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList"
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelsProvider from "./components/context/HotelsProvider";
import SingleHotel from "./components/SingelHotel/SingleHotel";
import Bookmark from "./components/BookMark/Bookmark";

function App() {
  return <div>
  <HotelsProvider>
  <Toaster/>
    <Header/>
    <Routes>
      <Route path="/" element={<LocationList/>}/>
      <Route path="/hotels" element={<AppLayout/>}>
        <Route index element={<Hotels/>}/>
        <Route path=":id" element={<SingleHotel/>}/>
      </Route>
      <Route path="/bookmark" element={<Bookmark/>}/>
    </Routes>
  </HotelsProvider>
  </div>
}

export default App;

