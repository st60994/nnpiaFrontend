import {League} from "../leagueFilter/LeagueCard.tsx";
import {Grid, Typography} from "@mui/material";

interface LeagueInfoProps {
    league: League | null;
}

const LeagueInfo = (leagueProps: LeagueInfoProps) => {
    return <Grid item xs={9} sm={9}>
        <Typography variant='h2' gutterBottom>{leagueProps.league ? leagueProps.league.name : ""}</Typography>
        <Typography>Founded on: {leagueProps.league ? leagueProps.league.foundationDate : ""}</Typography>
    </Grid>
}

export default LeagueInfo;