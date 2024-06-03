import { useState } from "react"
import { HiCalendar, HiSearch } from "react-icons/hi"
import { MdLocationOn } from "react-icons/md"


function Header() {
    const[destination, setDestination] = useState("")
return (
    <div className="header">
        <div className="headerSearch">
            <div className="headerSearchItem">
                <MdLocationOn className="headerIcon locationIcon"/>
                <input type="text"
                value={destination}
                onChange={(e)=> setDestination(e.target.value)}
                placeholder="where to go" 
                className="headerSearchInput"
                id="destination"/>
                <span className="seperator"></span>
            </div>
            <div className="headerSearchItem">
                <HiCalendar className="headerIcon dateIcon"/>
                <div className="dateDropDown">2023/06/23</div>
                <span className="seperator"></span>
            </div>
            <div className="headerSearchItem">
                <div id="optionDropDown">
                    1 adult . 2 children . 1 room
                </div>
            <span className="seperator"></span>
                
            </div>
            <div className="headerSearchItem">
                <button className="headerSearchBtn">
                    <HiSearch className="headerIcon"/>
                </button>
            </div>
        </div>
        
    </div>
)
}

export default Header