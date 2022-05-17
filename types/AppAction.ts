import type { Team, Role, Lane } from "./Team";
import type { Hero } from "./Hero";

export type TeamBuilderActionType = "deselectHero" |
  "selectHero" | "assignRole" | "unassignRole" |
  "assignLane" | "unassignLane" | "clearTeam";

export type ActionType = TeamBuilderActionType; // | OtherActionType

export interface TeamBuilderActionData {
  team: Team;
}

export interface HeroActionData {
  hero: Hero;
}

export type HeroSelectActionData = TeamBuilderActionData & HeroActionData;

export type HeroSelectAction = { type: "deselectHero" | "selectHero"; } & HeroSelectActionData
// export interface HeroSelectAction extends Action<HeroSelectActionData> {
//   type: "deselectHero" | "selectHero";
// }

export interface RoleAssignmentActionData extends HeroSelectActionData {
  role: Role;
}
export type RoleAssignmentAction = { type: "assignRole" | "unassignRole"; } & RoleAssignmentActionData
export interface LaneAssignmentActionData extends HeroSelectActionData {
  lane: Lane;
}
export type LaneAssignmentAction = { type: "assignLane" | "unassignLane"; } & LaneAssignmentActionData
export interface ClearTeamAction extends TeamBuilderActionData {
  type: "clearTeam";
}

// Legitimately unsure how I want to do this, or if I want to separate out the data
// Basically the problem I want to solve is: knowing how to construct an action to dispatch it
// and knowing what's included in an action when I'm handling a dispatch in the reducer
export type ActionData = TeamBuilderActionData | HeroActionData |
HeroSelectActionData | RoleAssignmentActionData | LaneAssignmentActionData

export interface Action<T extends ActionData> {
  type: ActionType;
  data: T;
}
// the relationship between these types could go the other way
// maybe we could use generics to define the data contained in the action, like above
export type AppAction = HeroSelectAction | RoleAssignmentAction |
  LaneAssignmentAction | ClearTeamAction;
