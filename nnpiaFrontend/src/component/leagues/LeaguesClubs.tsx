import {useEffect, useState} from "react";
import axios from "axios";
import {Club} from "../club/ClubInfo.tsx";
import ClubCard from "../club/ClubCard.tsx";
import {useSearchParams} from "react-router-dom";
import {Grid, Typography} from "@mui/material";

const LeaguesClubs = () => {
    const [clubs, setClubs] = useState<Club[]>([]);
    const [searchParams,] = useSearchParams();

    const leagueId = searchParams.get('leagueId');

    useEffect(() => {
        const fetchClubs = async () => {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const jwtToken = localStorage.getItem('token');
            console.log("jwt :" + `Bearer ${jwtToken}`);
            const config = {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            };
            let result;
            console.log("ID ", leagueId);
            if (leagueId != null) {
                result = await axios.get(
                    `${backendUrl}/clubs?leagueId=${leagueId}`, config);
            } else {
                result = null;
            }
            const data = result? result.data : [];
            await console.log(data);
            setClubs(data);
        };

        fetchClubs();
    }, [leagueId]);

    return (
        <Grid item xs={12}>
            <Typography variant='h3' gutterBottom>Clubs</Typography>
            {clubs.map((club) => (
                <ClubCard key={club.id} club={club} />
            ))}
        </Grid>
    );
}

export default LeaguesClubs;