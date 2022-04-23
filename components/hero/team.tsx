import { Action, TeamBuilderDispatch } from "../../pages/team-builder"
import HeroPortrait from "./portrait"
import type { Hero } from "../../types/Hero"
import { Dispatch, useContext } from "react"

export default function HeroTeam({ heroes } : { heroes: Hero[] }) {
  const dispatch: Dispatch<Action> = useContext(TeamBuilderDispatch);
  const heroClick = (hero: Hero) => (() => dispatch({type: "deselectHero", data: hero}));
  return (
    <div className="p-4 flex flex-row gap-4 w-1/2 h-16">
      {heroes.map((hero) => (
        <HeroPortrait key={hero.id} hero={hero} onClick={heroClick(hero)} />
      ))}
    </div>
  )
}
