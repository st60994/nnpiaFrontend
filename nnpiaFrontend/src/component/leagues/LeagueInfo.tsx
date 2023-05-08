import {League} from "../leagueFilter/LeagueCard.tsx";
import {Typography} from "@mui/material";

interface LeagueInfoProps {
    league: League | null;
}

const LeagueInfo = (leagueProps: LeagueInfoProps) => {
    return <div>
        <Typography variant='h2' gutterBottom>{leagueProps.league ? leagueProps.league.name : ""}</Typography>
        <Typography>Founded on: {leagueProps.league ? leagueProps.league.foundationDate : ""}</Typography>
    </div>
}

export default LeagueInfo;