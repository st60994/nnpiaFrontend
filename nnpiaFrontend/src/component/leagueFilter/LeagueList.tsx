import {useEffect, useState} from "react";
import axios from "axios";
import LeagueCard, {League} from "../leagueFilter/LeagueCard.tsx";
import NoLeagueFilterCard from "../leagueFilter/NoLeagueFilterCard.tsx";
import {Grid, Typography, Stack, Card} from "@mui/material";

type HandleLeagueSelect = (league: League) => void;

interface LeagueListProps {
    title: string;
    noFilter: boolean;
    handleLeagueSelect?: HandleLeagueSelect;
}

const LeagueList = ({title, noFilter, handleLeagueSelect}: LeagueListProps) => {
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
            if (handleLeagueSelect) {
                handleLeagueSelect(data[0]);
            }
        };

        fetchLeagues();
    }, []);

    return (
        <Grid item xs={12} sm={3} className={"league-filter-list"}>
            <Card sx={{height:'100vh'}}>
                <Stack>
                    <Typography variant='h2'>{title}</Typography>
                    {noFilter ? <NoLeagueFilterCard/> : null}
                    {leagues.map((league) => (
                        <LeagueCard key={league.id} league={league}
                                    onSelect={() => handleLeagueSelect ? handleLeagueSelect(league) : null}/>
                    ))}
                </Stack>
            </Card>
        </Grid>
    );
}

export default LeagueList;