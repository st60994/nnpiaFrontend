import MatchList from "../matches/MatchList.tsx";
import LeagueList from "../leagueFilter/LeagueList.tsx";
const SchedulePage = () => {
    return (
        <>
            <MatchList></MatchList>
            <LeagueList title={"League filter"} noFilter={true}></LeagueList>
        </>
    );
}

export default SchedulePage;