import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from "react-leaflet"
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";

function Map({markerLocations}) {
    
    const [mapCenter, setMapCenter] = useState([50, 4]);
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

const {
    isLoading: isLoadingPosition, 
    position: geolocationPosition, 
    getPosition} = useGeoLocation()

    useEffect(()=>{
        if(lat && lng)setMapCenter([lat, lng])
    },[lat, lng])

useEffect(()=>{
    if(geolocationPosition?.lat && geolocationPosition?.lng) setMapCenter(geolocationPosition.lat && geolocationPosition.lng)
}, [geolocationPosition])

return (
    <div className="mapContainer">
        <MapContainer
        className="map" 
        center={mapCenter} 
        zoom={13} 
        scrollWheelZoom={true}>
            <button onClick={getPosition} className="getlocation">use your location</button>
            if{isLoadingPosition ? "Loading ..." : "use your Locatuon"}
    <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    <DetectClick/>
    <ChangeCenter position={mapCenter}/>
{markerLocations.map((item)=>{
    <Marker key={item.id} position={[item.latitude, item.longitude]}>
    <Popup>
        {item.host_location}
    </Popup>
    </Marker>

})}
</MapContainer>,
    </div>
)
}

export default Map


function  ChangeCenter({position}){
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick(){
    const navigate = useNavigate();
    useMapEvent({
Click: (e) => navigate(`/bookmark/add? lat=${e.latlng.lat}&lat=${e.latlng.llng}`)
    })
    return null
}