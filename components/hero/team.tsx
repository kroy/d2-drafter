import { Action, Team, TeamBuilderDispatch } from "../../pages/team-builder"
import HeroPortrait from "./portrait"
import HeroTeamName from "./team/name"
import { Hero, placeholderHero } from "../../types/Hero"
import { Dispatch, useContext, useState } from "react"

function range(r: number): number[] {
  return Array.from(Array(r).keys())
}

export default function HeroTeam({ selectedHeroes, side = "radiant", size = 5 } : { selectedHeroes: Hero[], side?: Team, size?: number }) {
  const dispatch: Dispatch<Action> = useContext(TeamBuilderDispatch);
  const placeholderCount: number = size - selectedHeroes.length;
  const [copied, setCopy] = useState(false);
  const [teamName, setTeamName] = useState("The Happy Hamburglers");

  const heroClick = (hero: Hero) => (() => dispatch({type: "deselectHero", team: side, hero: hero}));
  const onTeamNameChange = (e: React.FormEvent<HTMLInputElement>) => setTeamName(e.currentTarget.value)
  const clearTeam = () => dispatch({type: "clearTeam", team: side});
  const shareTeam = () => {
    navigator.clipboard.writeText(
      `${teamName}: ` +
      selectedHeroes.map((hero) => hero.localized_name).join(" - ")
    );
    setCopy(true);
    setTimeout(() => setCopy(false), 2000);
  }
  return (
    <div className="p-4 lg:w-1/2 flex flex-row flex-wrap justify-center gap-4">
      <HeroTeamName teamName={teamName} onChange={onTeamNameChange} />
      <div className="flex flex-row flex-wrap justify-center gap-4 max-h-fit">
        {selectedHeroes.map((hero) => (
          <HeroPortrait key={hero.id} hero={hero} onClick={heroClick(hero)} />
        ))}
        {placeholderCount > 0 && range(placeholderCount).map((placeholderId) => (
          <HeroPortrait key={`placeholder-${placeholderId}`} hero={placeholderHero} />
        ))}
      </div>

      <div className="flex flex-row justify-center gap-4">
        <button className="rounded-full bg-pink-500 p-2 font-mono" onClick={clearTeam}>Clear Team</button>
        <button disabled={selectedHeroes.length < 5} className="w-32 disabled:opacity-50 rounded-full bg-orange-400 p-2 font-mono" onClick={shareTeam}>{copied? "Copied!" : "Share Team"}</button>
      </div>
    </div>
  )
}
