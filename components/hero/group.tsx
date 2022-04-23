import { Dispatch, useContext } from "react";
import { Hero } from "../../types/Hero";
import { TeamBuilderDispatch, Action } from "../../pages/team-builder";
import HeroPortrait from "./portrait";

export default function HeroGroup({ name, heroes, selectedHeroes } : { name: string, heroes: Hero[], selectedHeroes: Hero[] }) {
  const dispatch: Dispatch<Action> = useContext(TeamBuilderDispatch);
  const heroClick = (hero: Hero) => (() => dispatch({type: "selectHero", data: hero}));
  return (
    <section className="p-4">
      <h1 className="pb-4 pt-4 text-lg font-mono font-bold">{name}</h1>
      <div className="grid grid-cols-10 grid-flow-row gap-4 max-w-fit place-items-center">
        {heroes.map((hero: Hero) => (
          <div className="max-w-fit" key={hero.id}>
            <HeroPortrait hero={hero} onClick={heroClick(hero)} />
          </div>
        ))
        }
      </div>
    </section>
  );
}
