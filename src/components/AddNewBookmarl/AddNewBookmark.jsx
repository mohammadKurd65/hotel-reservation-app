import { useNavigate } from "react-router-dom"
import useUrlLocation from "../../hooks/useUrlLocation";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../context/BookmarkListContext";

// function getFlagEmoji(countryCode) {
//     const codePoints = countryCode
//     .toUpperCase()
//     .split('')
//     .map(char =>  127397 + char.charCodeAt());
//     return String.fromCodePoint(...codePoints);
// }

const BASE_GEOCODING_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";


function AddNewBookmark() {
    const[lat, lng] = useUrlLocation();
    const navigate = useNavigate();
    const [cityName, setCityName] = useState("");
    const[country, setCountry] = useState();
    const[countryCode, setCountryCode] = useState("");
    const[isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
    const[geoCodingError, setGeoCodingError] = useState(null);
    const {createBookmark} = useBookmark()

    // 

    useEffect(()=>{
        if(!lat || !lng) return;
        setIsLoadingGeoCoding(true);
        setGeoCodingError(null);
        async function feachLocationData(){

            try {
                const {data} = await axios.get(`${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`);
                if(!data.countryCode) throw new Error("this location is not city please click somewhere else.")
                setCityName(data.city || data.locality || "");
                setCountry(data.countryName);
                setCountryCode(data.countryCode);
            } catch (error) {
                setGeoCodingError(error.message);
            } finally{
                setIsLoadingGeoCoding(false);
            }


            feachLocationData();

        }
    }, [lat, lng])

    const handelSubmit = async (e)=>{
        e.preventDefault();
        if(!cityName || !country) return;

        const newBookmark = {
            cityName,
            country,
            countryCode,
            latitude: lat,
            longitude: lng,
            host_location: cityName + "" + country,
        };
        await createBookmark(newBookmark);
        navigate("/bookmark");
    }

    if(isLoadingGeoCoding) return <Loader/>
    if(geoCodingError) return <p>{geoCodingError}</p>
return (
    <div>
        <h2>Bookmark New Location</h2>
        <form  className="form" onSubmit={handelSubmit}>
            <div className="formControl">
                <label htmlFor="cityName">CityName</label>
                <input
                value={cityName} 
                onChange={(e)=> setCityName(e.target.value)}
                type="text" 
                name="cityName" 
                id="cityName"/>
            </div>
            <div className="formControl">
                <label htmlFor="country">Country</label>
                <input 
                value={country}
                onChange={(e)=> setCountry(e.target.value)}
                type="text" 
                name="country" 
                id="country"/>
                <ReactCountryFlag svg countryCode={countryCode} className="flag"/>
                <span className="flag"></span>
            </div>
            <div className="buttons">
                <button onClick={(e)=> {
                    e.preventDefault();
                    navigate(-1);
                }} className="btn btn--back">&larr; Back</button>
                <button className="btn btn-primary">&larr; Add New Bookmark</button>
            </div>
        </form>
    </div>
)
}

export default AddNewBookmark