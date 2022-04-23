import { Dispatch, useContext } from "react";
import { Hero } from "../../types/Hero";
import { TeamBuilderDispatch, Action } from "../../pages/team-builder";
import HeroPortrait from "./portrait";

export default function HeroGroup({ heroes, selectedHeroes } : { heroes: Hero[], selectedHeroes: Hero[] }) {
  const dispatch: Dispatch<Action> = useContext(TeamBuilderDispatch);
  const heroClick = (hero: Hero) => (() => dispatch({type: "selectHero", data: hero}));
  return (
    <section className="p-4 grid grid-cols-10 grid-flow-row gap-4 max-w-fit place-items-center">
      {heroes.map((hero: Hero) => (
        <div className="max-w-fit" key={hero.id}>
          <HeroPortrait hero={hero} onClick={heroClick(hero)} />
        </div>
      ))
      }
    </section>
  );
}
