import Head from "next/head";
import Layout from "../components/layout";
import { GetStaticProps } from 'next';
import type { Hero } from '../types/Hero';
import { OpenDota } from 'opendota.js';
import HeroGroup from "../components/hero/group";
import { createContext, Dispatch, Reducer, ReducerAction, useReducer } from "react";
import HeroTeam from "../components/hero/team";

export type Team = "radiant" | "dire" | "bans";
// map to https://docs.opendota.com/#tag/scenarios%2Fpaths%2F~1scenarios~1laneRoles%2Fget
export type Role = "carry" | "mid" | "offlaner" | "softSupport" | "hardSupport";
export type Lane = "safelane" | "middle" | "offlane" | "jungle";
export type Action = {type: "selectHero", team: Team, hero: Hero} |
  {type: "deselectHero", team: Team, hero: Hero} |
  {type: "assignRole", team: Team, hero: Hero, role: Role} |
  {type: "unassignRole", team: Team, hero: Hero, role: Role} |
  {type: "assignLane", team: Team, hero: Hero, lane: Lane} |
  {type: "unassignLane", team: Team, hero: Hero, lane: Lane} |
  {type: "clearTeam", team: Team};
export type LaneState = {[key in Lane]: Hero[] };
export type RoleState = {[key in Role]?: Hero };
export type TeamState = { selectedHeroes: Hero[], size: number, roles: RoleState, lanes: LaneState };
export type State = {[key in Team]: TeamState};
export const TeamBuilderDispatch = createContext<Dispatch<Action>>(undefined!)

const initialState: State = {
  radiant: {selectedHeroes: [], size: 5, roles: {}, lanes: {"safelane": [], "middle": [], "offlane": [], "jungle": []}},
  dire: {selectedHeroes: [], size: 5, roles: {}, lanes: {"safelane": [], "middle": [], "offlane": [], "jungle": []}},
  bans: {selectedHeroes: [], size: 5, roles: {}, lanes: {"safelane": [], "middle": [], "offlane": [], "jungle": []}}
};

function initialStateWithRandomBans(heroes: Hero[], bans: number = 5): State {
  const bannedHeroes: Hero[] = []
  for (let i = 0; i < bans; i++) {
    let randomIndex: number
    do {
      randomIndex =  Math.floor(Math.random() * heroes.length);
    } while(bannedHeroes.includes(heroes[randomIndex]))

    bannedHeroes.push(heroes[randomIndex]);
  }

  return {...initialState, bans:{...initialState.bans, selectedHeroes: bannedHeroes, size: bans}};
}

const reducer: Reducer<State, Action> = (state, action) => {
  let currRoles : RoleState;
  let currLanes : LaneState;
  switch (action.type) {
    case "selectHero":
      if (state[action.team].selectedHeroes.length >= state[action.team].size ||
        state[action.team].selectedHeroes.includes(action.hero)) {
        return state;
      }

      return {
        ...state,
        [action.team]: {
          ...state[action.team],
          selectedHeroes: state[action.team].selectedHeroes.concat([action.hero])
        }
      };
    case "deselectHero":
      // Really dumb. Refactor
      currRoles = state[action.team].roles;
      if (currRoles.carry === action.hero) delete currRoles.carry;
      if (currRoles.mid === action.hero) delete currRoles.mid;
      if (currRoles.offlaner === action.hero) delete currRoles.offlaner;
      if (currRoles.softSupport === action.hero) delete currRoles.softSupport;
      if (currRoles.hardSupport === action.hero) delete currRoles.hardSupport;

      currLanes = state[action.team].lanes
      currLanes = {
        "safelane": currLanes["safelane"].filter((hero) => hero !== action.hero),
        "middle": currLanes["middle"].filter((hero) => hero !== action.hero),
        "offlane": currLanes["offlane"].filter((hero) => hero !== action.hero),
        "jungle": currLanes["jungle"].filter((hero) => hero !== action.hero),
      }

      return {
        ...state,
        [action.team]: {
          ...state[action.team],
          lanes: currLanes,
          roles: currRoles,
          selectedHeroes: state[action.team].selectedHeroes.filter((hero) => hero.id !== action.hero.id)
        }
      };
    case "clearTeam":
      return {...state, [action.team]: initialState[action.team]};
    case "assignRole":
      // This is really stupid. Refactor to just use a Map
      currRoles = state[action.team].roles;
      if (currRoles.carry === action.hero) delete currRoles.carry;
      if (currRoles.mid === action.hero) delete currRoles.mid;
      if (currRoles.offlaner === action.hero) delete currRoles.offlaner;
      if (currRoles.softSupport === action.hero) delete currRoles.softSupport;
      if (currRoles.hardSupport === action.hero) delete currRoles.hardSupport;

      return {
        ...state,
        [action.team]: {
          ...state[action.team],
          roles: {...currRoles, [action.role]: action.hero}
        }
      }
    case "unassignRole":
      return {
        ...state,
        [action.team]: {
          ...state[action.team],
          roles: delete {...state[action.team].roles}[action.role]
        }
      }
    case "assignLane":
      currLanes = state[action.team].lanes
      currLanes = {
        "safelane": currLanes["safelane"].filter((hero) => hero !== action.hero),
        "middle": currLanes["middle"].filter((hero) => hero !== action.hero),
        "offlane": currLanes["offlane"].filter((hero) => hero !== action.hero),
        "jungle": currLanes["jungle"].filter((hero) => hero !== action.hero),
      }
      return {
        ...state,
        [action.team]: {
          ...state[action.team],
          lanes: {...currLanes, [action.lane]: currLanes[action.lane].concat(action.hero)}
        }
      }
      case "unassignLane":
      return {
        ...state,
        [action.team]: {
          ...state[action.team],
          lanes: {...state[action.team].lanes, [action.lane]: state[action.team].lanes[action.lane].filter((hero) => hero !== action.hero)}
        }
      }
    default:
      return state;
  }
}

export default function TeamBuilder({ heroes } : {
  heroes: Hero[]
}) {

  // const [state, dispatch] = useReducer(reducer, initialStateWithRandomBans(heroes));
  const [state, dispatch] = useReducer(reducer, initialState);

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
