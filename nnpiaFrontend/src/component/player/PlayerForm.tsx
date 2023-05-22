import {Paper, InputAdornment, MenuItem, TextField, Stack, Button} from "@mui/material";

import {useEffect, useState} from "react";
import {Country} from "../countries/CountryView.tsx";
import axios from "axios";
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import {DatePicker} from "@mui/x-date-pickers";


interface FormValues {
    name: string;
    shirtNumber: number;
    dateOfBirth: Date;
    height: number;
    weight: number;
    position: string;
    photoPath: string;
    clubId: number;
    countryId: number;
}

const PlayerForm = () => {
    const {id} = useParams<{ id: string }>();
    console.log("ID", id);
    const paperStyle = {padding: 20, width: 280, height: '80vh', margin: "20px auto"};
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
    const [position, setPosition] = useState('');
    const [country, setCountry] = useState('');
    const {register, handleSubmit, formState: {errors}} = useForm<FormValues>({})
    const jwtToken = localStorage.getItem('token');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const submitHandle = async (data: FormValues) => {
        console.log("proc")
        console.log(position)
        console.log(country)
        console.log("date", selectedDate)
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const config = {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        };

        await axios.post(`${backendUrl}/players`
            , {
                name: data.name,
                shirtNumber: data.shirtNumber,
                dateOfBirth: selectedDate,
                height: data.height,
                weight: data.weight,
                position: position,
                photoPath: data.photoPath,
                clubId: id,
                countryId: country
            }, config).catch(function (error) {
            console.log(error);
        });
        console.table(data);
    }
    console.log(country);
    const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCountry(event.target.value as string)
    }
    const handlePositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPosition(event.target.value as string)
    }

    return <Paper elevation={10} style={paperStyle}>
        <form onSubmit={handleSubmit(submitHandle)}>
            <Stack gap={2}>
                <TextField
                    label='Name'
                    helperText={errors.name && errors.name.message}
                    fullWidth
                    required{...register("name")}
                >
                </TextField>
                <TextField
                    label='Shirt number'
                    helperText={errors.shirtNumber && errors.shirtNumber.message}
                    required{...register("shirtNumber")}
                >
                </TextField>
                <TextField
                    label='Weight'
                    helperText={errors.weight && errors.weight.message}
                    InputProps={{
                        endAdornment: <InputAdornment position='end'> kg </InputAdornment>
                    }}
                    required{...register("weight")}
                >
                </TextField>
                <DatePicker
                    label="Date picker"
                    value={selectedDate}
                    onChange={(newValue) => {
                        setSelectedDate(newValue)
                    }}
                />
                <TextField
                    label='Height'
                    helperText={errors.height && errors.height.message}
                    InputProps={{
                        endAdornment: <InputAdornment position='end'> cm </InputAdornment>
                    }}
                    required{...register("height")}
                >
                </TextField>
                <TextField
                    label='Select a position'
                    select
                    value={position}
                    helperText={errors.position && errors.position.message}
                    onChange={handlePositionChange}
                    fullWidth

                >
                    <MenuItem key="attacker" value='attacker'>
                        <em>Attacker</em>
                    </MenuItem>
                    <MenuItem key="midfielder" value='midfielder'>
                        <em>Midfielder</em>
                    </MenuItem>
                    <MenuItem key="defender" value='defender'>
                        <em>Defender</em>
                    </MenuItem>
                    <MenuItem key="goalkeeper" value='goalkeeper'>
                        <em>Goalkeeper</em>
                    </MenuItem>


                </TextField>
                <TextField
                    label='Select a country'
                    select
                    value={country}
                    helperText={errors.countryId && errors.countryId.message}
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
            </Stack>
            <Button sx={{ marginTop: '16px' }} type="submit" variant='contained' fullWidth>OK</Button>
        </form>
    </Paper>

}

export default PlayerForm;