import { GetStaticProps } from 'next';
import Head from "next/head";
import { OpenDota } from 'opendota.js';
import { Reducer, useReducer } from "react";
import { initialState, State } from '../types/AppState';
import type { Action } from '../types/AppActions';
import { reducer, TeamBuilderDispatch } from "../app/reducer";
import HeroGroup from "../components/hero/group";
import HeroTeam from "../components/hero/team";
import Layout from "../components/layout";
import type { Hero } from '../types/Hero';

export default function TeamBuilder({ heroes } : {
  heroes: Hero[]
}) {
  // const [state, dispatch] = useReducer(reducer, initialStateWithRandomBans(heroes));
  const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, initialState);

  const compareHeroes = (a: Hero, b: Hero) : number => {
    return a.localized_name.localeCompare(b.localized_name);
  }
  const selectedHeroes = state.radiant.selectedHeroes.concat(state.dire.selectedHeroes);
  const strHeroes = heroes.filter((hero : Hero) => hero.primary_attr == "str").sort(compareHeroes);
  const agiHeroes = heroes.filter((hero : Hero) => hero.primary_attr == "agi").sort(compareHeroes);
  const intHeroes = heroes.filter((hero : Hero) => hero.primary_attr == "int").sort(compareHeroes);

  return (
    <Layout>
      <Head>
        <title>Dota2 Team Builder</title>
      </Head>
      <TeamBuilderDispatch.Provider value={dispatch}>
        <div className="sticky top-0 bg-slate-800/90 flex flex-row flex-wrap">
          <HeroTeam {...state.radiant} side="radiant" />
          {false && <HeroTeam {...state.dire} side="dire" />}
        </div>
        <div className="max-w-fit">
            <HeroGroup name="Strength" heroes={strHeroes} selectedHeroes={selectedHeroes} bannedHeroes={state.bans.selectedHeroes} />
            <HeroGroup name="Agility" heroes={agiHeroes} selectedHeroes={selectedHeroes} bannedHeroes={state.bans.selectedHeroes} />
            <HeroGroup name="Intelligence" heroes={intHeroes} selectedHeroes={selectedHeroes} bannedHeroes={state.bans.selectedHeroes} />
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
