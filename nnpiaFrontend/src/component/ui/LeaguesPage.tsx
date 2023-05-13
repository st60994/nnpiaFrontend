import LeagueList from "../leagueFilter/LeagueList.tsx";
import LeagueInfo from "../leagues/LeagueInfo.tsx";
import {League} from "../leagueFilter/LeagueCard.tsx";
import {useState} from "react";
import LeaguesClubs from "../leagues/LeaguesClubs.tsx";
import {useSearchParams} from "react-router-dom";
import {Card, CardContent, Grid} from "@mui/material";


const LeaguesPage = () => {
    const [selectedLeague, setSelectedLeague] = useState<League | null>(null);

    const handleLeagueSelect = (league: League) => {
        setSelectedLeague(league);
        setSearchParams({'leagueId': String(league.id)});
    };

    const [, setSearchParams] = useSearchParams();
    return <Grid container spacing={2}>
        <LeagueList
            title={'Leagues'}
            noFilter={false}
            handleLeagueSelect={handleLeagueSelect}
        />
        <Grid item xs={12} md={9}>
            <Card sx={{margin: '32px', padding_top: '10px'}}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <LeagueInfo league={selectedLeague}/>
                        </Grid>
                        <LeaguesClubs/>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
}

export default LeaguesPage;