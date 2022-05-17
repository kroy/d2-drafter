import type { Team, Role, Lane } from "./Team";
import type { Hero } from "./Hero";

export interface TeamBuilderAction {
  type: string;
  team: Team;
}
export interface HeroSelectAction extends TeamBuilderAction {
  type: "deselectHero" | "selectHero";
  hero: Hero;
}

export interface RoleAssignmentAction extends TeamBuilderAction {
  type: "assignRole" | "unassignRole";
  hero: Hero;
  role: Role;
}

export interface LaneAssignmentAction extends TeamBuilderAction {
  type: "assignLane" | "unassignLane"
  hero: Hero;
  lane: Lane;
}

export interface ClearTeamAction extends TeamBuilderAction {
  type: "clearTeam";
}

export type AppAction = HeroSelectAction | RoleAssignmentAction |
  LaneAssignmentAction | ClearTeamAction;
