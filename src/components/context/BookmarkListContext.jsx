import { createContext, useContext, useState } from "react"
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarkContext = createContext()
const Base_url = "http://localhost:5000"

function BookmarkListProvider({children}) {
    const[currentBookmark, setCurrentBookmark] = useState(null);
    const [isLoadingCurrentBookmark, setIsLoadingCurrentBookmark] = useState(false);
const{data:bookmarks, isLoading}= useFetch(`${Base_url}/bookmarks`
);

async function getBookmark(id){
    setIsLoadingCurrentBookmark(true);
    setCurrentBookmark(null)
try {
    const{data} = await axios.get(`${Base_url}/bookmarks/${id}`);
    setCurrentBookmark(data);
    setIsLoadingCurrentBookmark(false)
} catch (error) {
    toast.error(error.message)
    setIsLoadingCurrentBookmark(false)
}
}

return (
    <BookmarkContext.Provider value={{isLoading,bookmarks, currentBookmark, getBookmark, isLoadingCurrentBookmark}}>
        {children}
    </BookmarkContext.Provider>
)
}

export default BookmarkListProvider

export function useBookmark(){
    return useContext(BookmarkContext);
}