import LeagueList from "../leagueFilter/LeagueList.tsx";
import LeagueInfo from "../leagues/LeagueInfo.tsx";
import {League} from "../leagueFilter/LeagueCard.tsx";
import {useState} from "react";
import LeaguesClubs from "../leagues/LeaguesClubs.tsx";
import {useSearchParams} from "react-router-dom";


const LeaguesPage = () => {
    const [selectedLeague, setSelectedLeague] = useState<League | null>(null);

    const handleLeagueSelect = (league: League) => {
        setSelectedLeague(league);
        setSearchParams({'leagueId': String(league.id)});
    };

    const [, setSearchParams] = useSearchParams();
    return <>
        <LeagueList title={"Leagues"} noFilter={false} handleLeagueSelect={handleLeagueSelect}/>
        <LeagueInfo league={selectedLeague}/>
        <LeaguesClubs></LeaguesClubs>
    </>
}

export default LeaguesPage;