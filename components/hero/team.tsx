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
  return (
    <div className="p-4 flex flex-row flex-wrap justify-center gap-4 lg:w-1/2 max-h-fit">
      {heroes.map((hero) => (
        <HeroPortrait key={hero.id} hero={hero} onClick={heroClick(hero)} />
      ))}
      {range(placeholderCount).map((placeholderId) => (
        <HeroPortrait key={`placeholder-${placeholderId}`} hero={placeholderHero} />
      ))}
    </div>
  )
}
