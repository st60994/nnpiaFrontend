import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Avatar} from "@mui/material";
import CountryView, {Country} from "../countries/CountryView.tsx";

export interface Club {
    id: number;
    coachName: string;
    description: string;
    foundationDate: string;
    location: string;
    nickName: string;
    clubCountry: Country;
    name: string;
    imgPath: string;
}

const clubImgLocation = "/images/clubs/";
const ClubInfo = () => {
    const {id} = useParams<{ id: string }>();
    const [club, setClub] = useState<Club>();
    const jwtToken = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    };

    useEffect(() => {
        const fetchClub = async () => {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            let result;
            console.log(id);
            console.log(`${backendUrl}/clubs/${id}`);
            result = await axios.get(`${backendUrl}/clubs/${id}`, config);
            const data = result?.data;
            console.table(data);
            setClub(data);
        };

        fetchClub();
    }, [id]);
    if (!club){
        return <div>Loading data...</div>
    }
    return (
        <div>
            <h1>
                Club Info
            </h1>
            <div>
                <h3>{club?.name}</h3>
                <p>Nickname: {club?.nickName}</p>
                <Avatar sx={{width: 120, height: 120}} src={`${clubImgLocation}/${club?.imgPath}`}></Avatar>
                <CountryView country={club?.clubCountry}></CountryView>
                <p>City: {club?.location}</p>
                <p>Coach: {club?.coachName}</p>
                <p>Founded on: {club?.foundationDate}</p>
                <p>{club?.description}</p>
            </div>
        </div>
    )
}

export default ClubInfo;