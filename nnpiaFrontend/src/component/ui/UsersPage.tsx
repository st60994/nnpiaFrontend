import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";

interface AppUser {
    username: string;
    role: string;
}

const UsersPage = () => {
    const [users, setUsers] = useState<AppUser[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const jwtToken = localStorage.getItem('token');
            console.log("jwt :" + `Bearer ${jwtToken}`);
            const config = {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            };
            let result;
            console.log(`${backendUrl}/users`);
            result = await axios.get(`${backendUrl}/users`, config);
            const data = result?.data;
            console.table(data);
            setUsers(data || []);
        };

        fetchUsers();
    }, []);
    return (
        <Paper sx={{ mt: 2, p:2 }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle1">Username</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle1">Role</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.username}>
                                <TableCell>
                                    <Typography variant="body1">{user.username}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1">{user.role}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );

};

export default UsersPage;