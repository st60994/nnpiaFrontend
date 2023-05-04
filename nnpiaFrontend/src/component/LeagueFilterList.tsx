import {useEffect, useState} from "react";
import axios from "axios";
import LeagueCard, {League} from "./LeagueCard.tsx";
import './LeagueFilterList.css';
import NoLeagueFilterCard from "./NoLeagueFilterCard.tsx";

const LeagueFilterList = () => {
    const [leagues, setMatches] = useState<League[]>([]);

    useEffect(() => {
        const fetchLeagues = async () => {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const jwtToken = localStorage.getItem('token');
            console.log("jwt :" + `Bearer ${jwtToken}`);
            const config = {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            };
            const result = await axios.get(`${backendUrl}/leagues`, config);
            const data = result.data;
            await console.log(data);
            setMatches(data);
        };

        fetchLeagues();
    }, []);

    return (
        <div className={"league-filter-list"}>
            <h1>League filter</h1>
            <NoLeagueFilterCard></NoLeagueFilterCard>
            {leagues.map((league) => (
                <LeagueCard key={league.id} league={league}/>
            ))}
        </div>
    );
}

export default LeagueFilterList;