
import { Toaster } from "react-hot-toast";
import "./App.css";
import { Header } from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList"
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelsProvider from "./components/context/HotelsProvider";
import SingleHotel from "./components/SingelHotel/SingleHotel";
import BookmarkLayout from "./components/BookMarkLayout/BookmarkLayout";
import BookmarkListProvider from "./components/context/BookmarkListContext";
import SingleBookmark from "./components/SingleBookmark/SingleBookmark";
import AddNewBookmark from "./components/AddNewBookmarl/AddNewBookmark";

function App() {
  return <div>
  <BookmarkListProvider>
  <HotelsProvider>
  <Toaster/>
    <Header/>
    <Routes>
      <Route path="/" element={<LocationList/>}/>
      <Route path="/hotels" element={<AppLayout/>}>
        <Route index element={<Hotels/>}/>
        <Route path=":id" element={<SingleHotel/>}/>
      </Route>
      <Route path="/bookmark" element={<BookmarkLayout/>}>
      <Route index element={<div>boolmarl List</div>}/>
      <Route path=":id" element={<SingleBookmark/>}/>
      <Route path="add" element={<AddNewBookmark/>}/>
      </Route>
    </Routes>
  </HotelsProvider>
  </BookmarkListProvider>
  </div>
}

export default App;

