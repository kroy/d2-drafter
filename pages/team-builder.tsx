import Head from "next/head";
import Layout from "../components/layout";
import { GetStaticProps } from 'next';
import type { Hero } from '../types/Hero';
import { OpenDota } from 'opendota.js';
import HeroGroup from "../components/hero/group";
import { createContext, Dispatch, Reducer, ReducerAction, useReducer } from "react";
import HeroPortrait from "../components/hero/portrait";
import HeroTeam from "../components/hero/team";

export type Action = {type: "selectHero", data: Hero} | {type: "deselectHero", data: Hero};
export type State = {selectedHeroes: Hero[]};
export const TeamBuilderDispatch = createContext<Dispatch<Action>>(undefined!)

const initialState: State = { selectedHeroes: []}

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "selectHero":
      if (state.selectedHeroes.includes(action.data)) {
        return state;
      }
      return {selectedHeroes: state.selectedHeroes.concat([action.data])};
    case "deselectHero":
      return {selectedHeroes: state.selectedHeroes.filter((hero) => hero.id != action.data.id)}
    default:
      return state;
  }
}

export default function TeamBuilder({ heroes } : {
  heroes: Hero[]
}) {

  const [state, dispatch] = useReducer(reducer, initialState);

  const compareHeroes = (a: Hero, b: Hero) : number => {
    return a.localized_name.localeCompare(b.localized_name);
  }
  const strHeroes = heroes.filter((hero : Hero) => hero.primary_attr == "str").sort(compareHeroes);
  const agiHeroes = heroes.filter((hero : Hero) => hero.primary_attr == "agi").sort(compareHeroes);
  const intHeroes = heroes.filter((hero : Hero) => hero.primary_attr == "int").sort(compareHeroes);

  return (
    <Layout>
      <Head>
        <title>Dota2 Team Builder</title>
      </Head>
      <TeamBuilderDispatch.Provider value={dispatch}>
        <div className="sticky top-0 bg-slate-800/90">
          <HeroTeam heroes={state.selectedHeroes} />
        </div>
        <div className="max-w-fit">
            <HeroGroup name="Strength" heroes={strHeroes} selectedHeroes={state.selectedHeroes} />
            <HeroGroup name="Agility" heroes={agiHeroes} selectedHeroes={state.selectedHeroes} />
            <HeroGroup name="Intelligence" heroes={intHeroes} selectedHeroes={state.selectedHeroes} />
        </div>
      </TeamBuilderDispatch.Provider>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<{heroes: Hero[]}> = async () => {
  const opendota = new OpenDota(process.env.OPENDOTA_API_KEY);
  const heroData = await opendota.getHeroes();

  return {
    props: { heroes: heroData }
  }
}
