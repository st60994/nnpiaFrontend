import {League} from "../leagueFilter/LeagueCard.tsx";
import {Grid, Stack, Typography} from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import {convertDateFormat} from "../../convertDateFormat.ts";

interface LeagueInfoProps {
    league: League | null;
}

const LeagueInfo = (leagueProps: LeagueInfoProps) => {
    return <Grid item xs={9} sm={9}>
        <Typography variant='h3' gutterBottom>{leagueProps.league ? leagueProps.league.name : ""}</Typography>
        <Stack direction="row" spacing={0.5}><FlagIcon/><Typography>Founded
            on: {convertDateFormat(leagueProps.league ? leagueProps.league.foundationDate : "")}</Typography></Stack>
    </Grid>
}

export default LeagueInfo;