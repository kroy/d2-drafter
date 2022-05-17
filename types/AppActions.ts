import type { Team, Role, Lane } from "./Team";
import type { Hero } from "./Hero";

export type Action = {type: "selectHero", team: Team, hero: Hero} |
  {type: "deselectHero", team: Team, hero: Hero} |
  {type: "assignRole", team: Team, hero: Hero, role: Role} |
  {type: "unassignRole", team: Team, hero: Hero, role: Role} |
  {type: "assignLane", team: Team, hero: Hero, lane: Lane} |
  {type: "unassignLane", team: Team, hero: Hero, lane: Lane} |
  {type: "clearTeam", team: Team};
