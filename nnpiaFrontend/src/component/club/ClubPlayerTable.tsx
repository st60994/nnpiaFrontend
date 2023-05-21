import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {
    Avatar,
    Paper, Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    IconButton,
    Box
} from "@mui/material";
import {convertDateFormat} from "../../convertDateFormat.ts";
import AddIcon from '@mui/icons-material/Add';

interface Player {
    id: number;
    countryId: number;
    age: number;
    name: string;
    shirtNumber: number;
    dateOfBirth: string;
    height: number;
    weight: number;
    position: string;
    photoPath: string;
}

type Column = keyof Player; // type alias to represent the column keys

const playerImgLocation = "/images/players/";

const ClubPlayerTable = () => {
    const {id} = useParams<{ id: string }>();
    const [players, setPlayers] = useState<Player[]>([]);
    const [sorting, setSorting] = useState<{ column: Column; order: "asc" | "desc" }>({
        column: "name",
        order: "asc",
    });


    useEffect(() => {
        const fetchPlayers = async () => {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const jwtToken = localStorage.getItem('token');
            console.log("jwt :" + `Bearer ${jwtToken}`);
            const config = {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            };
            let result;
            console.log(id);
            if (id != null) {
                console.log(`${backendUrl}/players?clubId=${id}`);
                result = await axios.get(`${backendUrl}/players?clubId=${id}`, config);
            }
            const data = result?.data;
            console.table(data);
            setPlayers(data || []);
        };

        fetchPlayers();
    }, [id]);

    const handleSort = (column: Column) => {
        setSorting((prev) => ({
            column,
            order: prev.column === column && prev.order === "asc" ? "desc" : "asc",
        }));
    };

    const sortedPlayers = [...players].sort((a, b) => {
        const order = sorting.order === "asc" ? 1 : -1;
        if (a[sorting.column] > b[sorting.column]) {
            return order;
        }
        if (a[sorting.column] < b[sorting.column]) {
            return -order;
        }
        return 0;
    });

    return (
        <Paper>
            <Typography variant="h4" align="center" gutterBottom>
                Team Lineup
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650, padding: '16px'}} aria-label="simple table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" onClick={() => handleSort("name")}>
                                <Typography variant="subtitle1">
                                    Player
                                    {sorting.column === "name" && (sorting.order === "asc" ? " ▲" : " ▼")}
                                </Typography>
                            </TableCell>
                            <TableCell align="right" onClick={() => handleSort("shirtNumber")}>
                                <Typography variant="subtitle1">
                                    #
                                    {sorting.column === "shirtNumber" && (sorting.order === "asc" ? " ▲" : " ▼")}
                                </Typography>
                            </TableCell>
                            <TableCell align="right" onClick={() => handleSort("position")}>
                                <Typography variant="subtitle1">
                                    Position
                                    {sorting.column === "position" && (sorting.order === "asc" ? " ▲" : " ▼")}
                                </Typography>
                            </TableCell>
                            <TableCell align="right" onClick={() => handleSort("age")}>
                                <Typography variant="subtitle1">
                                    Age
                                    {sorting.column === "age" && (sorting.order === "asc" ? " ▲" : " ▼")}
                                </Typography>
                            </TableCell>
                            <TableCell align="right" onClick={() => handleSort("dateOfBirth")}>
                                <Typography variant="subtitle1">
                                    Birth Date
                                    {sorting.column === "dateOfBirth" && (sorting.order === "asc" ? " ▲" : " ▼")}
                                </Typography>
                            </TableCell>
                            <TableCell align="right" onClick={() => handleSort("height")}>
                                <Typography variant="subtitle1">
                                    Height (cm)
                                    {sorting.column === "height" && (sorting.order === "asc" ? " ▲" : " ▼")}
                                </Typography>
                            </TableCell>
                            <TableCell align="right" onClick={() => handleSort("weight")}>
                                <Typography variant="subtitle1">
                                    Weight (kg)
                                    {sorting.column === "weight" && (sorting.order === "asc" ? " ▲" : " ▼")}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedPlayers.map((row) => (
                            <TableRow key={row.name} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell scope="row">
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Avatar sx={{width: 60, height: 60}}
                                                src={`${playerImgLocation}/${row.photoPath}`}/>
                                        <Typography variant="body2">{row.name}</Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="body2">{row.shirtNumber}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="body2">{row.position}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="body2">{row.age}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="body2">{convertDateFormat(row.dateOfBirth)}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="body2">{row.height}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="body2">{row.weight}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 2, alignItems: "center"}}>
                <IconButton component={Link} to={`/playerForm/${id}`}>
                    <Typography>Add new player</Typography>
                    <AddIcon></AddIcon>
                </IconButton>
            </Box>
        </Paper>

    );
}

export default ClubPlayerTable;