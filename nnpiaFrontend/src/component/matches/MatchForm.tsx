import {Paper, MenuItem, TextField, Stack, Button} from "@mui/material";

import {useEffect, useState} from "react";
import axios from "axios";
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import {DatePicker} from "@mui/x-date-pickers";
import {League} from "../leagueFilter/LeagueCard.tsx";
import {Club} from "../club/ClubInfo.tsx";
import {Match} from "./MatchCard.tsx";


interface FormValues {
    date: Date;
    awayTeamScore: number;
    awayTeamId: number;
    homeTeamScore: number;
    homeTeamId: number;
    leagueId: number;
}

const MatchForm = () => {
    const {id} = useParams<{ id: string }>();
    const paperStyle = {padding: 20, width: 280, height: '70vh', margin: "20px auto"};
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

        const fetchClubs = async () => {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const jwtToken = localStorage.getItem('token');
            console.log("jwt :" + `Bearer ${jwtToken}`);
            const config = {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            };
            const result = await axios.get(`${backendUrl}/clubs`, config);
            const data = result.data;
            await console.log(data);
            setClubs(data);
        };

        const fetchBaseMatch = async () => {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const jwtToken = localStorage.getItem('token');
            console.log("jwt :" + `Bearer ${jwtToken}`);
            const config = {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            };
            const result = await axios.get(`${backendUrl}/matches/${id}`, config);
            const data = result.data;
            await console.log(data);
            setFetchedMatch(data);
        };

        fetchLeagues();
        fetchClubs();
        if (id != null) {
            fetchBaseMatch();
        }
    }, []);

    const [leagues, setLeagues] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [homeTeam, setHomeTeam] = useState('');
    const [awayTeam, setAwayTeam] = useState('');
    const [fetchedMatch, setFetchedMatch] = useState<Match | null>(null);
    const [league, setLeague] = useState('');
    const {register, handleSubmit, formState: {errors}} = useForm<FormValues>({})
    const jwtToken = localStorage.getItem('token');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const submitHandle = async (data: FormValues) => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const config = {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        };


        await axios.post(`${backendUrl}/players`
            , {
                date: selectedDate,
                awayTeamScore: data.awayTeamScore,
                awayTeamId: awayTeam,
                homeTeamScore: data.homeTeamScore,
                homeTeamId: homeTeam,
                leagueId: league
            }, config).catch(function (error) {
            console.log(error);
        });
        console.table(data);
    }
    const handleAwayTeamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAwayTeam(event.target.value as string)
    }
    const handleHomeTeamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHomeTeam(event.target.value as string)
    }
    const handleLeagueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLeague(event.target.value as string)
    }

    return <Paper elevation={10} style={paperStyle}>
        <form onSubmit={handleSubmit(submitHandle)}>
            <Stack gap={2}>
                <DatePicker
                    label="Date picker"
                    value={selectedDate || (fetchedMatch ? new Date(fetchedMatch.date) : null)}
                    onChange={(newValue) => {
                        setSelectedDate(newValue as Date | null);
                    }}
                />
                <TextField
                    label='Select a home team'
                    select
                    value={homeTeam || (fetchedMatch ? fetchedMatch.homeTeam.id : '')}
                    helperText={errors.homeTeamId && errors.homeTeamId.message}
                    onChange={handleHomeTeamChange}
                    fullWidth
                >
                    {clubs && clubs.map((club: Club) => (
                        <MenuItem key={club.id} value={club.id}>
                            {club.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label='Home team score'
                    value={homeTeam || (fetchedMatch ? fetchedMatch.homeTeamScore : '')}
                    helperText={errors.homeTeamScore && errors.homeTeamScore.message}
                    required{...register("homeTeamScore")}
                >
                </TextField>
                <TextField
                    label='Select an away team'
                    select
                    value={awayTeam || (fetchedMatch ? fetchedMatch.awayTeam.id : '')}
                    helperText={errors.awayTeamId && errors.awayTeamId.message}
                    onChange={handleAwayTeamChange}
                    fullWidth
                >
                    {clubs && clubs.map((club: Club) => (
                        <MenuItem key={club.id} value={club.id}>
                            {club.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label='Away team score'
                    value={homeTeam || (fetchedMatch ? fetchedMatch.awayTeamScore : '')}
                    helperText={errors.awayTeamScore && errors.awayTeamScore.message}
                    required{...register("awayTeamScore")}
                >
                </TextField>
                <TextField
                    label='Select a league'
                    select
                    value={league || (fetchedMatch ? fetchedMatch.league.id : '')}
                    helperText={errors.leagueId && errors.leagueId.message}
                    onChange={handleLeagueChange}
                    fullWidth
                >
                    {leagues && leagues.map((league: League) => (
                        <MenuItem key={league.id} value={league.id}>
                            {league.name}
                        </MenuItem>
                    ))}
                </TextField>
            </Stack>
            <Button type="submit" variant='contained' fullWidth>OK</Button>
        </form>
    </Paper>

}

export default MatchForm;