
import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./component/Header/Header";
import LocationList from "./component/Header/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";

function App() {
  return <div>
    <Toaster/>
    <Header/>
    <Routes>
      <Route path="/" element={<LocationList/>}/>
    </Routes>
  </div>
}

export default App;

