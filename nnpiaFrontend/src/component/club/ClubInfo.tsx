import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Avatar, Card, CardContent, Typography, Box, Stack} from "@mui/material";
import CountryView, {Country} from "../countries/CountryView.tsx";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SportsIcon from '@mui/icons-material/Sports';
import FlagIcon from '@mui/icons-material/Flag';
import DescriptionIcon from '@mui/icons-material/Description';
import {convertDateFormat} from "../../convertDateFormat.ts";

export interface Club {
    id: number;
    coachName: string;
    description: string;
    foundationDate: string;
    location: string;
    nickName: string;
    clubCountry: Country;
    name: string;
    imgPath: string;
}

const clubImgLocation = "/images/clubs/";
const ClubInfo = () => {
    const {id} = useParams<{ id: string }>();
    const [club, setClub] = useState<Club>();
    const jwtToken = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    };

    useEffect(() => {
        const fetchClub = async () => {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            let result;
            console.log(id);
            console.log(`${backendUrl}/clubs/${id}`);
            result = await axios.get(`${backendUrl}/clubs/${id}`, config);
            const data = result?.data;
            console.table(data);
            setClub(data);
        };

        fetchClub();
    }, [id]);
    if (!club) {
        return <div>Loading data...</div>
    }
    return (
        <Card sx={{padding: '32px'}}>
            <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography variant='h2' gutterBottom>
                    Club Info
                </Typography>
                <Box sx={{display: 'flex', alignItems: 'center', marginTop: '1rem'}}>
                    <Avatar sx={{width: 200, height: 200, marginRight: '1rem'}}
                            src={`${clubImgLocation}/${club?.imgPath}`}/>
                    <Stack spacing={1.5}>
                        <Typography  variant='h3'>{club?.name}</Typography>
                        <Typography> Nickname: '{club?.nickName}'</Typography>
                        <Stack direction="row" spacing={0.5}> <LocationOnIcon/>
                            <Typography>{club?.location}</Typography><CountryView country={club?.clubCountry}/></Stack>
                        <Stack direction="row" spacing={0.5}><SportsIcon/>
                            <Typography>{club?.coachName}</Typography></Stack>
                        <Stack direction="row" spacing={0.5}><FlagIcon/><Typography>Founded
                            on: {convertDateFormat(club?.foundationDate)}</Typography></Stack>
                        <Stack direction="row"
                               spacing={0.5}><DescriptionIcon/><Typography>{club?.description}</Typography></Stack>
                    </Stack>
                </Box>
            </CardContent>
        </Card>


    );
}

export default ClubInfo;