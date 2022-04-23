import { Action, TeamBuilderDispatch } from "../../pages/team-builder"
import HeroPortrait from "./portrait"
import { Hero, placeholderHero } from "../../types/Hero"
import { Dispatch, useContext } from "react"

function range(r: number): number[] {
  return Array.from(Array(r).keys())
}

export default function HeroTeam({ heroes, size = 5 } : { heroes: Hero[], size?: number }) {
  const dispatch: Dispatch<Action> = useContext(TeamBuilderDispatch);
  const placeholderCount: number = size - heroes.length;

  const heroClick = (hero: Hero) => (() => dispatch({type: "deselectHero", data: hero}));
  const clearTeam = () => dispatch({type: "clearTeam", data: "radiant"})
  return (
    <div className="p-4 lg:w-1/2">
      <div className="flex flex-row flex-wrap justify-center gap-4 max-h-fit">
        {heroes.map((hero) => (
          <HeroPortrait key={hero.id} hero={hero} onClick={heroClick(hero)} />
        ))}
        {placeholderCount > 0 && range(placeholderCount).map((placeholderId) => (
          <HeroPortrait key={`placeholder-${placeholderId}`} hero={placeholderHero} />
        ))}
      </div>

      <div className="flex flex-row justify-center gap-4 p-4">
        <button className="rounded-full bg-pink-500 p-2 font-mono" onClick={clearTeam}>Clear Team</button>
      </div>
    </div>
  )
}
