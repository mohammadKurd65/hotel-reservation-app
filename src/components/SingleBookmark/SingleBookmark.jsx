import { useNavigate, useParams } from "react-router-dom"
import { useBookmark } from "../context/BookmarkListContext"
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";


function SingleBookmark() {
    const {id} = useParams();
    const navigate = useNavigate()
    const{getBookmark, isLoadingCurrentBookmark, currentBookmark} = useBookmark();

    useEffect(()=>{
        getBookmark(id)
    },[id])

const handelBack= ()=>{
navigate(-1);
}
    if(isLoadingCurrentBookmark || !currentBookmark) return<Loader/>
return (
    <div>
        <button onClick={handelBack} className="btn btn--back">&larr; Back</button>
        <h2>{currentBookmark.cityName}</h2>
        <div  className={`bookmarkItem`}>
                        <ReactCountryFlag svg countryCode={currentBookmark.countryCode}/>
                        &nbsp; <strong>{currentBookmark.cityName}</strong> &nbsp; 
                        <span>{currentBookmark.country}</span>
                    </div>
    </div>
)
}

export default SingleBookmark