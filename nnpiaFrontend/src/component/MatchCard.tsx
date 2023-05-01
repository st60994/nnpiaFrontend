import {FC} from "react";
import {Team} from "./TeamInfo.tsx";
import {Button} from "@mui/material";
import defaultClubImage from '../assets/leagues/undefined.png';
import {League} from "./LeagueCard.tsx";

const clubImgLocation = "/images/clubs/";

interface Match {
    id: number;
    date: string;
    homeTeamScore: number;
    awayTeamScore: number;
    awayTeam: Team;
    homeTeam: Team;
    league: League;
}

interface Props {
    match: Match;
}

const MatchCard: FC<Props> = ({ match }) => {
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
        <div>
            {formatDate(match.date)}
            <Button>
                {match.homeTeam.name}
                <img
                    width="60px"
                    height="60px"
                    src={homeImagePath ? homeImagePath : defaultClubImage}
                    alt={match.homeTeam.name}
                />
            </Button>
            {match.homeTeamScore} – {match.awayTeamScore}
            <Button>
                <img
                    width="60px"
                    height="60px"
                    src={awayImagePath ? awayImagePath : defaultClubImage}
                    alt={match.awayTeam.name}
                />
                {match.awayTeam.name}
            </Button>
            {match.league.name}
        </div>
    );
};

export default MatchCard;