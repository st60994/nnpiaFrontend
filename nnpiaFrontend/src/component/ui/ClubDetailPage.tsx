import ClubInfo from "../club/ClubInfo.tsx";
import ClubPlayerTable from "../club/ClubPlayerTable.tsx";
import {Paper} from "@mui/material";

const ClubDetailPage = () => {
    return (
        <Paper>
            <ClubInfo/>
            <ClubPlayerTable/>
        </Paper>
    );
}

export default ClubDetailPage;