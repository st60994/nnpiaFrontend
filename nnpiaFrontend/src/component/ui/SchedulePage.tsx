import MatchList from "../matches/MatchList.tsx";
import LeagueList from "../leagueFilter/LeagueList.tsx";
import {Grid} from "@mui/material";
const SchedulePage = () => {
    return (
        <Grid container>
            <MatchList></MatchList>
            <LeagueList title={"League filter"} noFilter={true}></LeagueList>
        </Grid>
    );
}

export default SchedulePage;