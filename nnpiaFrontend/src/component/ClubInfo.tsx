import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export interface Club {
    id: number;
    coachName: string;
    description: string;
    foundationDate: string;
    location: string;
    nickName: string;
    countryId: number;
    name: string;
    abbreviation: string;
    imgPath: string;
}

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

    return (
        <div>
            <h1>
                Club Info
            </h1>
            {club?.name}
        </div>
    )
}

export default ClubInfo;