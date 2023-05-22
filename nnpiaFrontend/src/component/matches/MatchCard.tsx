import {FC} from "react";
import {Button, Card, CardContent, IconButton, Stack, Typography} from "@mui/material";
import defaultClubImage from '../../assets/leagues/undefined.png';
import {League} from "../leagueFilter/LeagueCard.tsx";
import {Link} from "react-router-dom";
import {Club} from "../club/ClubInfo.tsx";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";

const clubImgLocation = "/images/clubs/";

export interface Match {
    id: number;
    date: string;
    homeTeamScore: number;
    awayTeamScore: number;
    awayTeam: Club;
    homeTeam: Club;
    league: League;
}

interface Props {
    match: Match;
    onDelete: (deletedMatchId: number) => void;
}

const MatchCard: FC<Props> = ({match, onDelete}) => {
    const homeImagePath = `${clubImgLocation}${match.homeTeam.imgPath}`;
    const awayImagePath = `${clubImgLocation}${match.awayTeam.imgPath}`;
    const role = localStorage.getItem("role");

    const formatDate = (inputDateString: string): string => {
        const date = new Date(inputDateString);
        return `${date.getDate()}.${date.getMonth()}. ${date.getFullYear()} ${padZero(date.getHours())}:${padZero(date.getMinutes())}`;
    };

    const padZero = (n: number): string => {
        return n < 10 ? `0${n}` : n.toString();
    };

    const handleDelete = async () => {
        const jwtToken = localStorage.getItem('token');
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const config = {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        };
        await axios.delete(`${backendUrl}/matches/${match.id}`, config);
        onDelete(match.id);
    }

    return (
        <Card sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            position: 'relative',
            width: 'calc(((100% - 442px) / 12) * 12 + 374px)',
            height: '100px',
            margin: '0 34px',
            marginBottom: '0.1rem',
            padding: "1rem"
        }}>
            <Typography>{formatDate(match.date)}</Typography>
            <CardContent sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center", // Add this line to center the stack
                padding: "1rem",
                width: 'calc(((100% - 442px) / 12) * 12 + 374px)',
            }}>
                <Stack direction="row" sx={{alignItems: "center"}}>
                    <Stack direction="row" sx={{display: "flex", alignItems: "center", gap: "1rem", padding: "1rem"}}>
                        <Button
                            component={Link}
                            to={`/clubs/${match.homeTeam.id}`}
                            sx={{
                                display: "flex",
                                gap: "0.5rem"
                            }}
                        >
                            <Typography variant="body1">{match.homeTeam.name}</Typography>
                            <img
                                src={homeImagePath ? homeImagePath : defaultClubImage}
                                alt={match.homeTeam.name}
                                width="60px"
                                height="60px"
                            />
                        </Button>
                        <Typography variant="body1" sx={{alignSelf: 'center'}}>
                            {match.homeTeamScore} – {match.awayTeamScore}
                        </Typography>
                        <Button
                            component={Link}
                            to={`/clubs/${match.awayTeam.id}`}
                            sx={{
                                display: "flex",
                                gap: "0.5rem",
                            }}
                        >
                            <img
                                src={awayImagePath ? awayImagePath : defaultClubImage}
                                alt={match.awayTeam.name}
                                width="60px"
                                height="60px"
                            />
                            <Typography variant="body1">{match.awayTeam.name}</Typography>
                        </Button>
                    </Stack>

                </Stack>
            </CardContent>
            <Stack direction="row" sx={{ml: "auto", alignItems: "center"}}>
                <Typography variant="body1">{match.league.name}</Typography>
                {role === 'ADMINISTRATOR' ? (
                    <>
                        <IconButton>
                            <EditIcon/>
                        </IconButton>
                        <IconButton onClick={handleDelete}>
                            <DeleteIcon/>
                        </IconButton>
                    </>
                ) : null}
            </Stack>
        </Card>
    );
};

export default MatchCard;