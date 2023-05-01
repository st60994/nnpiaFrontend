import defaultLeagueImage from '../assets/leagues/undefined.png';
import {Button} from "@mui/material";
import {useSearchParams} from "react-router-dom";

const leagueImgLocation = "/images/leagues/";

export interface League {
    id: number;
    name: string;
    foundationDate: string;
    imgPath: string;
}

interface Props {
    league: League;
}



const LeagueCard = ({league}: Props) => {

    const [, setSearchParams] = useSearchParams();
    const handleButtonClick = () =>{
        setSearchParams({'leagueId': String(league.id)});
    }

    console.log(`${leagueImgLocation}${league.imgPath}`);
    const path = `${leagueImgLocation}${league.imgPath}`;
    console.log(league.name);
    return (
        <Button onClick={handleButtonClick}>
            <img width="60px" height="60px" src={path ? path : defaultLeagueImage} alt={league.name}/>
            <div> {league.name}</div>
        </Button>

    );
};

export default LeagueCard