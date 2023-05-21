import {Club} from "./ClubInfo.tsx";
import {Avatar, Stack, Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {Link} from "react-router-dom";

interface Props {
    club: Club;
}

const clubImgLocation = "/images/clubs/";
const ClubCard = (props: Props) => {
    return <Card sx={{ width: '100%' }}>
        <CardActionArea component={Link} to={`/clubs/${props.club.id}`}>
            <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ width: 60, height: 60 }} src={`${clubImgLocation}/${props.club?.imgPath}`} />
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{props.club.name}</Typography>
                </Stack>
            </CardContent>
        </CardActionArea>
    </Card>


}

export default ClubCard;