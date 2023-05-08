import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {
    Avatar,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";

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
        <div>
            <h1>Team lineup</h1>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" onClick={() => handleSort("name")}>
                                <Typography>Player
                                    {sorting.column === "name" && (sorting.order === "asc" ? "▲" : "▼")}
                                </Typography>
                            </TableCell>
                            <TableCell align="right" onClick={() => handleSort("shirtNumber")}>
                                <Typography>#
                                    {sorting.column === "shirtNumber" && (sorting.order === "asc" ? "▲" : "▼")}
                                </Typography>
                            </TableCell>
                            <TableCell align="right" onClick={() => handleSort("position")}>
                                <Typography>Position
                                    {sorting.column === "position" && (sorting.order === "asc" ? "▲" : "▼")}
                                </Typography>
                            </TableCell>
                            <TableCell align="right" onClick={() => handleSort("age")}>
                                <Typography>Age
                                    {sorting.column === "age" && (sorting.order === "asc" ? "▲" : "▼")}
                                </Typography>
                            </TableCell>
                            <TableCell align="right" onClick={() => handleSort("dateOfBirth")}>
                                <Typography>Birth date
                                    {sorting.column === "dateOfBirth" && (sorting.order === "asc" ? "▲" : "▼")}
                                </Typography>
                            </TableCell>
                            <TableCell align="right" onClick={() => handleSort("height")}>
                                <Typography>Height
                                    {sorting.column === "height" && (sorting.order === "asc" ? "▲" : "▼")}
                                </Typography>
                            </TableCell>
                            <TableCell align="right" onClick={() => handleSort("weight")}>
                                <Typography>Weight
                                    {sorting.column === "weight" && (sorting.order === "asc" ? "▲" : "▼")}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedPlayers.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    <Avatar src={`${playerImgLocation}/${row.photoPath}`}></Avatar>
                                    <Typography variant='body2'>{row.name}</Typography>

                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant='body2'>{row.shirtNumber}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant='body2'>{row.position}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant='body2'>{row.age}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant='body2'>{row.dateOfBirth}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant='body2'>{row.height}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant='body2'>{row.weight}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ClubPlayerTable;