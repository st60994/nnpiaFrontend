import {FC} from "react";
import {Button, Card, CardContent, IconButton, Typography} from "@mui/material";
import defaultClubImage from '../../assets/leagues/undefined.png';
import {League} from "../leagueFilter/LeagueCard.tsx";
import {Link} from "react-router-dom";
import {Club} from "../club/ClubInfo.tsx";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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
}

const MatchCard: FC<Props> = ({match}) => {
    const homeImagePath = `${clubImgLocation}${match.homeTeam.imgPath}`;
    const awayImagePath = `${clubImgLocation}${match.awayTeam.imgPath}`;

    const formatDate = (inputDateString: string): string => {
        const date = new Date(inputDateString);
        return `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()} ${padZero(date.getHours())}:${padZero(date.getMinutes())}`;
    };

    const getMonthName = (month: number): string => {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return monthNames[month];
    };

    const padZero = (n: number): string => {
        return n < 10 ? `0${n}` : n.toString();
    };

    return (
        <Typography variant='body2'>
            <Card>
                <CardContent>
                    {formatDate(match.date)}
                    <Button component={Link} to={`/clubs/${match.homeTeam.id}`}>
                        <Typography> {match.homeTeam.name}</Typography>
                        <img
                            width="60px"
                            height="60px"
                            src={homeImagePath ? homeImagePath : defaultClubImage}
                            alt={match.homeTeam.name}
                        />
                    </Button>
                    {match.homeTeamScore} – {match.awayTeamScore}
                    <Button component={Link} to={`/clubs/${match.awayTeam.id}`}>
                        <img
                            width="60px"
                            height="60px"
                            src={awayImagePath ? awayImagePath : defaultClubImage}
                            alt={match.awayTeam.name}
                        />
                        <Typography> {match.awayTeam.name}</Typography>
                    </Button>
                    {match.league.name}
                    <IconButton>
                        <EditIcon/>
                    </IconButton>
                    <IconButton>
                        <DeleteIcon/>
                    </IconButton>
                </CardContent>
            </Card>
        </Typography>
    );
};

export default MatchCard;