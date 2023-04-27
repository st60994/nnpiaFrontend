import {Match} from "./MatchList";
import {useEffect, useState} from "react";

interface Props {
    match: Match
}

const MatchCard = ({match}: Props) => {

    return (
        <div>
            {match.date} {match.homeTeam.name} {match.homeTeamScore} – {match.awayTeamScore} {match.awayTeam.name}
        </div>
    );
};

export default MatchCard;


