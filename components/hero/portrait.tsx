import { useContext } from "react";
import { TeamBuilderDispatch, Action } from "../../pages/team-builder";
import type { Hero } from "../../types/Hero";
import classnames from 'classnames';

export default function HeroPortrait({ hero, selectable = false }: { hero: Hero, selectable?: boolean }) {
  const dispatch = useContext(TeamBuilderDispatch)
  const handleClick = () => dispatch({type: "selectHero", data: hero});

  return (
    <div 
      className={classnames("w-24 h-12 rounded-lg ring-2 ring-amber-400 bg-red-700", {"cursor-pointer": selectable})}
      {... selectable && {onClick: handleClick} }
    >
      { hero.localized_name }
    </div>
  )
}