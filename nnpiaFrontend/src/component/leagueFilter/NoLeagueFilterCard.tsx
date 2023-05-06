import defaultLeagueImage from '../../assets/leagues/undefined.png';
import {Button} from "@mui/material";
import {useSearchParams} from "react-router-dom";

const NoLeagueFilterCard = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const handleButtonClick = () => {
        searchParams.delete("leagueId");
        setSearchParams(searchParams);
    }

    return (
        <Button onClick={handleButtonClick}>
            <img width="60px" height="60px" src={defaultLeagueImage}/>
            <div> No filter</div>
        </Button>

    );
};

export default NoLeagueFilterCard