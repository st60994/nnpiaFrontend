import defaultLeagueImage from '../../assets/leagues/undefined.png';
import {Button, Typography} from "@mui/material";
import {useSearchParams} from "react-router-dom";

const NoLeagueFilterCard = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const handleButtonClick = () => {
        searchParams.delete("leagueId");
        setSearchParams(searchParams);
    }

    return (
        <Button onClick={handleButtonClick} sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            textAlign: 'left',
        }}>
            <img width="60px" height="60px" src={defaultLeagueImage}/>
            <Typography> No filter</Typography>
        </Button>

    );
};

export default NoLeagueFilterCard