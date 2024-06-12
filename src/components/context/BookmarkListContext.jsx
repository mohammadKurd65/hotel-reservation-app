import { createContext, useContext, useEffect, useState } from "react"
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarkContext = createContext()
const Base_url = "http://localhost:5000"

function BookmarkListProvider({children}) {
    const[currentBookmark, setCurrentBookmark] = useState(null);
    const[bookmarks, setBookmarks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
// const{data:bookmarks, isLoading}= useFetch(`${Base_url}/bookmarks`
// );

useEffect(()=>{
    async function fetchBookmarkList(){
        setIsLoading(true);
    try {
        const{data} = await axios.get(`${Base_url}/bookmarks`);
        setBookmarks(data);
    } catch (error) {
        toast.error(error.message)
    } finally{
        setIsLoading(false);
    }
    }

    fetchBookmarkList();
}, [])


async function getBookmark(id){
    setIsLoading(true);
    setCurrentBookmark(null)
try {
    const{data} = await axios.get(`${Base_url}/bookmarks/${id}`);
    setCurrentBookmark(data);
} catch (error) {
    toast.error(error.message)
} finally{
    setIsLoading(false)
}
}


async function createBookmark(newBookmark){
    setIsLoading(true);
    
try {
    const{data} = await axios.post(`${Base_url}/bookmarks/`, newBookmark);
    setCurrentBookmark(data);
    setBookmarks((prev)=> [...prev, data]);
} catch (error) {
    toast.error(error.message)
} finally{
    setIsLoading(false)
}
}

async function deleteBookmark(id){
    setIsLoading(true);
    
try {
    await axios.delete(`${Base_url}/bookmarks/${id}`);
    setBookmarks((prev)=> prev.filter((item)=> item.id !== id));
} catch (error) {
    toast.error(error.message)
} finally{
    setIsLoading(false)
}
}



return (
    <BookmarkContext.Provider 
    value={{
        isLoading,
        bookmarks, 
        currentBookmark, 
        getBookmark, 
        createBookmark,
        deleteBookmark,
        }}>
        {children}
    </BookmarkContext.Provider>
)
}

export default BookmarkListProvider

export function useBookmark(){
    return useContext(BookmarkContext);
}