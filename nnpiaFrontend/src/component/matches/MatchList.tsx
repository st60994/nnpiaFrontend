import {useEffect, useState} from "react";
import MatchCard, {Match} from "./MatchCard.tsx";
import axios from "axios";
import {useSearchParams} from "react-router-dom";
import {Typography, ButtonGroup, Button, Grid, Stack, MenuItem, TextField} from "@mui/material";

const PAGE_SIZE_OPTIONS = [1, 10, 20];
const MatchList = () => {
    const [matches, setMatches] = useState<Match[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
    const [searchParams,] = useSearchParams();

    const leagueId = searchParams.get('leagueId');

    useEffect(() => {
        const fetchMatches = async () => {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            let result;
            const jwtToken = localStorage.getItem('token');
            console.log("jwt :" + `Bearer ${jwtToken}`);
            const config = {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            };
            if (leagueId != null) {
                result = await axios.get(
                    `${backendUrl}/matches?leagueId=${leagueId}&page=${currentPage}&size=${pageSize}`, config);
            } else {
                result = await axios.get(
                    `${backendUrl}/matches?page=${currentPage}&size=${pageSize}`, config
                );
            }
            const data = result.data.content;
            await console.log(data);
            setMatches(data);
            setTotalPages(result.data.totalPages);
        };

        fetchMatches();
    }, [leagueId, currentPage, pageSize]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };
    return (
        <Grid item xs={12} sm={9}>
            <Typography sx={{padding: '1rem'}} variant='h3' gutterBottom>Matches</Typography>
            {matches.map((match) => (
                <MatchCard key={match.id} match={match}/>
            ))}
            <Stack direction="row" display="flex" alignItems="center" justifyContent="center">
                <Typography sx={{padding: '2rem'}}>
                    Page {currentPage + 1} of {totalPages}
                </Typography>
                <ButtonGroup variant='text' aria-label='alignment button group' sx={{mr: '1rem'}}>
                    <Button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 0}
                    >
                        Prev
                    </Button>
                    <Button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages - 1}
                    >
                        Next
                    </Button>
                </ButtonGroup>
                <Typography sx={{mr: '0.5rem'}}>
                    Page size:
                </Typography>
                <TextField
                    select
                    size="small"
                    value={pageSize}
                    onChange={(event) => setPageSize(Number(event.target.value))}
                    sx={{ml: '0.5rem'}}
                >
                    {PAGE_SIZE_OPTIONS.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

            </Stack>
        </Grid>

    );
};

export default MatchList;