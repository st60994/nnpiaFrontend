import LeagueList from "../leagueFilter/LeagueList.tsx";
import LeagueInfo from "../leagues/LeagueInfo.tsx";
const LeaguesPage = () => {
    return <>
        <LeagueList title={"Leagues"} noFilter={false}/>
        <LeagueInfo/>
    </>
}

export default LeaguesPage;