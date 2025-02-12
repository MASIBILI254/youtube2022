import "./Reserve.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../Hooks/useFetch";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
const Reserve = ({ setOpen, hotelid }) => {
    const{dates}=useContext(SearchContext);
    const[selectedRooms,setSelectedRooms] = useState([]);
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const navigate = useNavigate();
    const { data, loading, error } = useFetch(`http://localhost:5000/hotel/room/${id}`);
    console.log(data);

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const date = new Date(start.getTime());
        const lists=[];
        while(date <= end){
            lists.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }
        return lists;
    }
    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);
    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) => alldates.includes(new Date(date).getTime()));
        return !isFound;
    }

    if (loading) {
        return <div>Loading...</div>;
    }



    // Check if data is an array, otherwise default to an empty array
    const roomsArray = Array.isArray(data) ? data : [];
    console.log(roomsArray);

const handleSelect = (e) =>{
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter(item => item !== value));

}
const handleClick = async ()=>{
    try {
        await Promise.all(
            selectedRooms.map((roomId) => {
                const res = axios.put(`http://localhost:5000/rooms/updateRoomAvailability/${roomId}`, {
                    dates: alldates,
                });
                return res.json();
            })

        );
    setOpen(false);
    navigate("/");
    console.log("button clicked");
        
    } catch (error) {
        <div>Error:{error.message}</div>

    }

}

    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark} className="reserveClose" onClick={() => setOpen(false)} />
                    <span>Select your rooms:</span>
                    {roomsArray.length > 0 ? (
                     roomsArray.map((item,index)=>(
                        <div className="rItem" key={index}>
                            <div className="rItemInfo">
                                 <div className="rTitle">{item ?.title}</div>
                                <div className="rDesc">{item ?.desc}</div>
                                <div className="rMax">
                                    Max people: <b>{item ?.maxPeople}</b>
                                </div>
                                <div className="rPrice">{item ?.price}</div>
                            </div>
                            <div className="rSelectRooms">
                                {item ?.roomNumbers.map((roomNumber, index) => (
                                    <div className="room" key={index}>
                                        <label>{roomNumber?.number}</label>
                                    <input type="checkbox" value={roomNumber?._id} onChange={handleSelect} disabled={!isAvailable(roomNumber)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                    ) : (
                    <div>No rooms available</div>
                )}
                   
                    <button onClick={handleClick} className="rButton">Reserve Now!</button>
            </div>
           
        </div>
    );
};
export default Reserve;