import { createContext, Dispatch, Reducer } from "react"
import type { AppAction } from "../types/AppAction";
import type { State, RoleState, LaneState } from "../types/AppState";
import { initialState } from "../types/AppState";

export const TeamBuilderDispatch = createContext<Dispatch<AppAction>>(undefined!)

export const reducer: Reducer<State, AppAction> = (state, action) => {
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