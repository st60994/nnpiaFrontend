import {Avatar, Stack, Typography} from "@mui/material";

export interface Country {
    id: number;
    abbreviation: string;
    name: string;
    flagPath: string;
}

interface Props {
    country: Country | undefined;
}

const countryImageLocation = "/images/countries/";
const CountryView = (props: Props) => {
    const country = props.country;
    return (
        <Stack direction="row" gap={1}>
            <Typography style={{
                display: 'inline-block',
                marginLeft: '10px',
                verticalAlign: 'middle'
            }}>{country?.abbreviation}</Typography>
            <Avatar sx={{width: 25, height: 25}} src={`${countryImageLocation}/${country?.flagPath}`}></Avatar>
        </Stack>
    );
}

export default CountryView;