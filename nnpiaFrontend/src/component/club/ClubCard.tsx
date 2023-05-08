import {Club} from "./ClubInfo.tsx";
import {Avatar, Button, Card, Typography} from "@mui/material";
import {Link} from "react-router-dom";

interface Props {
    club: Club;
}

const clubImgLocation = "/images/clubs/";
const ClubCard = (props: Props) => {
    return <Card>
        <Button component={Link} to={`/clubs/${props.club.id}`}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Avatar sx={{width: 60, height: 60}} src={`${clubImgLocation}/${props.club?.imgPath}`}></Avatar>
                <Typography variant='body2'>{props.club.name}</Typography>
            </div>
        </Button>
    </Card>

}

export default ClubCard;