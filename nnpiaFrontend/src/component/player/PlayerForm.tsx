import {Box, InputAdornment, MenuItem, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {Country} from "../countries/CountryView.tsx";
import axios from "axios";

const PlayerForm = () => {
    useEffect(() => {
        const fetchCountries = async () => {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const jwtToken = localStorage.getItem('token');
            console.log("jwt :" + `Bearer ${jwtToken}`);
            const config = {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            };
            const result = await axios.get(`${backendUrl}/countries`, config);
            const data = result.data;
            await console.log(data);
            setCountries(data);
        };

        fetchCountries();
    }, []);

    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('');
    console.log(country);
    const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCountry(event.target.value as string)
    }

    return <Box>
        <TextField
            label='Weight'
            InputProps={{
                endAdornment: <InputAdornment position='end'> kg </InputAdornment>
            }}
        >
        </TextField>
        <TextField
            label='Select a country'
            select
            value={country}
            onChange={handleCountryChange}
            fullWidth
        >
            <MenuItem value=''>
                <em>None</em>
            </MenuItem>
            {countries && countries.map((country: Country) => (
                <MenuItem key={country.id} value={country.id}>
                    {country.abbreviation}
                </MenuItem>
            ))}
        </TextField>
    </Box>

}
// TODO ComboBox: https://www.youtube.com/watch?v=tKApfSoDPgM&list=PLC3y8-rFHvwh-K9mDlrrcDywl7CeVL2rO&index=8

export default PlayerForm;