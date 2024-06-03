import { useRef, useState } from "react"
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi"
import { MdLocationOn } from "react-icons/md"
import useOusideClick from "../../hooks/useOutsideClick"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";


function Header() {
    const[destination, setDestination] = useState("")
    const [openOptions, setOpenOptions] = useState(false)
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    })
    const [date, setDate] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
    }]);

    const [openDate, setOpenDate] = useState(false)

    const handlerOptions = (name, operation)=>{
setOptions((prev)=>{
    return{
        ...prev,
        [name] : operation === "inc" ? options[name] +1 : options[name] -1
    }
})
    }
return (
    <div className="header">
        <h2>Home</h2>
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
                <div onClick={()=> setOpenDate(!openDate)} className="dateDropDown">
                    {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")} `}
                </div>
                {openDate && (
                    <DateRange 
                    onChange={(item)=> setDate([item.selection])} 
                    ranges={date} 
                    className="date"
                    minDate={new Date()}
                    moveRangeOnFirstSelection={true}
                    />
                )
            }
                <span className="seperator"></span>
            </div>
            <div className="headerSearchItem">
                <div id="optionDropDown" 
                onClick={()=> setOpenOptions(!openOptions)}>
                    {options.adult}adult. {options.children} children . {options.room} room
                </div>
                {openOptions && <GuestOptionsList setOpenOptions={setOpenOptions} options={options} handlerOptions={handlerOptions}/> }
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

function GuestOptionsList({options, handlerOptions, setOpenOptions}){
    const optionsRef = useRef();
    useOusideClick(optionsRef,"optionDropDown" ,()=> setOpenOptions(false))
    return (
        <div className="guestOptions" ref={optionsRef}>
    <OptionItem 
    handlerOptions={handlerOptions}
    type="adult" 
    options={options} 
    minLimit={1}/>
    <OptionItem 
    handlerOptions={handlerOptions}
    type="children" 
    options={options} 
    minLimit={0}/>
    <OptionItem
    handlerOptions={handlerOptions}
    type="room" 
    options={options} 
    minLimit={1}
    />
        </div>
    )
}

function OptionItem({options, type, minLimit, handlerOptions}){
    return(
        <div className="guestOptionItem">
        <span className="optionText">{type}</span>
        <div className="optionCounter">
            <button className="optionCounterBtn"
            onClick={()=>handlerOptions(type, "dec")}
            disabled={options[type] <= minLimit}
            >
                <HiMinus className="icon"/>
            </button>
            <span className="optionCounterNumber">{options[type]}</span>
            <button className="optionCounterBtn" onClick={()=>handlerOptions(type, "inc")}>
                <HiPlus className="icon"/>
            </button>
        </div>
    </div>

    )
}