import {useEffect, useState} from "react";
import axios from "axios";
import LeagueCard, {League} from "../leagueFilter/LeagueCard.tsx";
import './LeagueList.css';
import NoLeagueFilterCard from "../leagueFilter/NoLeagueFilterCard.tsx";

interface LeagueListProps {
    title: string;
    noFilter: boolean;
}

const LeagueList = ({title, noFilter}: LeagueListProps) => {
    const [leagues, setLeagues] = useState<League[]>([]);


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
            setLeagues(data);
        };

        fetchLeagues();
    }, []);

    return (
        <div className={"league-filter-list"}>
            <h1>{title}</h1>
            {noFilter ? <NoLeagueFilterCard/> : null}
            {leagues.map((league) => (
                <LeagueCard key={league.id} league={league}/>
            ))}
        </div>
    );
}

export default LeagueList;