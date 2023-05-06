import {Avatar} from "@mui/material";

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
        <div>
            <div style={{display: 'inline-block', verticalAlign: 'middle'}}>
                <Avatar src={`${countryImageLocation}/${country?.flagPath}`}></Avatar>
            </div>
            <p style={{ display: 'inline-block', marginLeft: '10px', verticalAlign: 'middle' }}>{country?.abbreviation}</p>
        </div>
    );
}

export default CountryView;