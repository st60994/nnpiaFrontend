import {useEffect, useState} from "react";
import MatchCard, {Match} from "./MatchCard.tsx";
import axios from "axios";
import {useSearchParams} from "react-router-dom";
import {Typography, ButtonGroup, Button} from "@mui/material";

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
        <div>
            <Typography variant='h1' gutterBottom>Matches</Typography>
            {matches.map((match) => (
                <MatchCard key={match.id} match={match}/>
            ))}
            <div>
                Page {currentPage + 1} of {totalPages}
                <ButtonGroup variant='text' aria-label = 'alignment button group'>
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
                <label>
                    Page size:
                    <select
                        value={pageSize}
                        onChange={(event) => setPageSize(Number(event.target.value))}
                    >
                        {PAGE_SIZE_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
        </div>
    );
};

export default MatchList;