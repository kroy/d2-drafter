import { Dispatch, useContext, useState } from "react";
import { Hero } from "../../types/Hero";
import { TeamBuilderDispatch, Action } from "../../pages/team-builder";
import HeroPortrait from "./portrait";

export default function HeroGroup({ name, heroes, selectedHeroes } : { name: string, heroes: Hero[], selectedHeroes: Hero[] }) {
  const [collapsed, setCollapsed] = useState(false)
  const dispatch: Dispatch<Action> = useContext(TeamBuilderDispatch);
  const heroClick = (hero: Hero) => (() => dispatch({type: "selectHero", data: hero}));
  const heroSelectable = (hero: Hero) => !selectedHeroes.includes(hero);
  const toggleCollapsed = () => setCollapsed(!collapsed)
  return (
    <section className="p-2 lg:p-4">
      <h2 className="pb-4 pt-4 text-lg font-mono font-bold">{name} 
        <button className="w-8" onClick={toggleCollapsed}>{collapsed? "+" : "-"}</button>
      </h2>
      <div className="flex flex-row flex-wrap gap-4 justify-center max-w-full">
        {!collapsed && heroes.map((hero: Hero) => (
          <div className="max-w-fit" key={hero.id}>
            <HeroPortrait hero={hero} {... heroSelectable(hero) && {onClick: heroClick(hero)}} />
          </div>
        ))
        }
      </div>
    </section>
  );
}
