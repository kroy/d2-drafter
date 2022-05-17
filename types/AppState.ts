import type { Lane, Role, Team } from './Team';
import type { Hero } from './Hero';

export type LaneState = {[key in Lane]: Hero[] };
export type RoleState = {[key in Role]?: Hero };
export type TeamState = { selectedHeroes: Hero[], size: number, roles: RoleState, lanes: LaneState };
export type State = {[key in Team]: TeamState};

export const initialState: State = {
  radiant: {selectedHeroes: [], size: 5, roles: {}, lanes: {"safelane": [], "middle": [], "offlane": [], "jungle": []}},
  dire: {selectedHeroes: [], size: 5, roles: {}, lanes: {"safelane": [], "middle": [], "offlane": [], "jungle": []}},
  bans: {selectedHeroes: [], size: 5, roles: {}, lanes: {"safelane": [], "middle": [], "offlane": [], "jungle": []}}
};

export function initialStateWithRandomBans(heroes: Hero[], bans: number = 5): State {
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