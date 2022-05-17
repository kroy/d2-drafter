import { Dispatch, useContext, useState } from "react";
import { Hero } from "../../types/Hero";
import type { Action } from "../../types/AppActions";
import { useAppReducer } from "../../hooks/useAppReducer";
import HeroPortrait from "./portrait";

export default function HeroGroup({ name, heroes, selectedHeroes, bannedHeroes } : { name: string, heroes: Hero[], selectedHeroes: Hero[], bannedHeroes: Hero[] }) {
  const [collapsed, setCollapsed] = useState(false)
  const dispatch: Dispatch<Action> = useAppReducer();
  const heroClick = (hero: Hero) => (() => dispatch({type: "selectHero", team: "radiant", hero: hero}));
  const heroSelectable = (hero: Hero) => !selectedHeroes.concat(bannedHeroes).includes(hero);
  const toggleCollapsed = () => setCollapsed(!collapsed)
  return (
    <section className="p-2 lg:pl-4 lg:pr-4">
      <h2 className="pb-4 text-lg font-mono font-bold">{name} 
        <button className="w-8" onClick={toggleCollapsed}>{collapsed? "+" : "-"}</button>
      </h2>
      <div className="flex flex-row flex-wrap gap-4 justify-center max-w-full">
        {!collapsed && heroes.map((hero: Hero) => (
          <div className="max-w-fit" key={hero.id}>
            <HeroPortrait hero={hero} {... heroSelectable(hero) && {onClick: heroClick(hero)}} banned={bannedHeroes.includes(hero)} />
          </div>
        ))
        }
      </div>
    </section>
  );
}
