import { createContext, useContext, useState } from "react"
import { useSearchParams } from "react-router-dom"
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const HotelContext = createContext()
const Base_url = "http://localhost:5000/hotels"
function HotelsProvider({children}) {
    const[currentHotel, setCurrentHotel] = useState(null);
    const [isLoadingCurrentHotel, setIsLoadingCurrentHotel] = useState(false);
const[searchParams, setSearchParams] = useSearchParams();
const destination = searchParams.get("destination");
const room = JSON.parse(searchParams.get("options"))?.room;
const{data:hotels, isLoading}= useFetch(Base_url ,
    `q=${destination || ""}&accommodates_get=${room || 1}`
);

async function getHotel(id){
    setIsLoadingCurrentHotel(true);
try {
    const{data} = await axios.get(`${Base_url}/${id}`);
    setCurrentHotel(data);
    setIsLoadingCurrentHotel(false)
} catch (error) {
    toast.error(error.message)
    setIsLoadingCurrentHotel(false)
}
}

return (
    <HotelContext.Provider value={{isLoading,hotels, currentHotel, getHotel, isLoadingCurrentHotel}}>
        {children}
    </HotelContext.Provider>
)
}

export default HotelsProvider

export function useHotels(){
    return useContext(HotelContext);
}