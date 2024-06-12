import { createContext, useContext, useEffect, useReducer } from "react"
import axios from "axios";
import toast from "react-hot-toast";

const BookmarkContext = createContext()
const Base_url = "http://localhost:5000"

const intialStatae = {
    bookmarks: [],
    isLoading: false,
    currentBookmark: null,
    error: null,
}

function bookmarkReducer(state, action){
switch (action.type) {
    case "loading": return{
        ...state,
        isLoading: true,
    }
    case "bookmarks/loaded": return({
        ...state,
        isLoading: false,
        bookmarks: action.payload,
    })
    case "bookmark/loaded": return({
        ...state,
        isLoading: false,
        currentBookmark: action.payload,
    })
    case "bookmark/created": return({
        ...state,
        isLoading: false,
        bookmarks: [...state.bookmarks, action.payload],
        currentBookmark: action.payload,
    })
    case "bookmark/deleted": return({
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter((item)=> item.id !== action.payload),
        currentBookmark: null,
    })
    case "rejected": return({
        ...state,
        isLoading: false,
        error: action.payload,
    })
    default:
    throw new Error("Unknown action");
}
}

function BookmarkListProvider({children}) {
    // const[currentBookmark, setCurrentBookmark] = useState(null);
    // const[bookmarks, setBookmarks] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
// const{data:bookmarks, isLoading}= useFetch(`${Base_url}/bookmarks`
// );


const [{bookmarks, isLoading, currentBookmark}, dispatch]= useReducer(bookmarkReducer, intialStatae)

useEffect(()=>{
    async function fetchBookmarkList(){
        dispatch({type: "loading"})
    try {
        const{data} = await axios.get(`${Base_url}/bookmarks`);
        dispatch({type: "bookmarks/loaded" ,payload: data})
    } catch (error) {
        toast.error(error.message);
        dispatch({type: "rejected", payload: "an Error occured in loading bookmarks"});
    } 
    }

    fetchBookmarkList();
}, [])


async function getBookmark(id){
    if(Number(id) === currentBookmark?.id) return;
    dispatch({type: "loading"})
    // setCurrentBookmark(null)
try {
    const{data} = await axios.get(`${Base_url}/bookmarks/${id}`);
    dispatch({type: "bookmark/loaded", payload: data});
} catch (error) {
    toast.error(error.message);
    dispatch({type: "rejected", payload: "an Error occured in fetching single bookmark"});
} 
}


async function createBookmark(newBookmark){
    dispatch({type: "loading"})
    
try {
    const{data} = await axios.post(`${Base_url}/bookmarks/`, newBookmark);
    dispatch({type: "bookmark/created", payload: data});
    // setBookmarks((prev)=> [...prev, data]);
} catch (error) {
    toast.error(error.message);
    dispatch({type: "rejected", payload: "an Error occured in fetching single bookmark"});
} 
}

async function deleteBookmark(id){
    dispatch({type: "loading"})
    
try {
    await axios.delete(`${Base_url}/bookmarks/${id}`);
    dispatch({type: "bookmark/deleted", payload: id});
} catch (error) {
    toast.error(error.message);
    dispatch({type: "rejected", payload: "an Error occured in fetching single bookmark"});
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