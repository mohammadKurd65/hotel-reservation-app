
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
import AuthProvider from "./components/context/AuthProvider";
import Bookmark from "./components/BookMark/Bookmark";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
function App() {
  return <div>
  <AuthProvider>
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
      <Route path="/bookmark" element={<ProtectedRoute>
        <BookmarkLayout/>
      </ProtectedRoute>}>
      <Route index element={<Bookmark/>}/>
      <Route path=":id" element={<SingleBookmark/>}/>
      <Route path="add" element={<AddNewBookmark/>}/>
      </Route>
    </Routes>
  </HotelsProvider>
  </BookmarkListProvider>
  </AuthProvider>
  </div>
}

export default App;

