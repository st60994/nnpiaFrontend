import {useEffect, useState} from "react";
import {Team} from "./TeamInfo";
import MatchCard from "./MatchCard";

export interface Match {
    id: number;
    date: string;
    homeTeamScore: number;
    awayTeamScore: number;
    awayTeam: Team;
    homeTeam: Team;
}

const MatchList = () => {
    const [matches, setMatches] = useState<Match[]>([]);

    useEffect(() => {
        const fetchMatches = async () => {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const result = await fetch(`${backendUrl}/matches`);
            const data = await result.json();
            await console.log(data);
            setMatches(data);
        };

        fetchMatches();
    }, []);

    return (
        <div>
            <h1>Matches</h1>
            <ul>
                {matches.map((match) => (
                    <MatchCard key={match.id} match={match}/>
                ))}
            </ul>
        </div>
    );
};

export default MatchList;