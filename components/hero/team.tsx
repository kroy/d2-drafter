import { IconArrowUpRight, IconChristmasTree, IconCornerRightUp, IconCornerUpRight, IconDice1, IconDice2, IconDice3, IconDice4, IconDice5 } from "@tabler/icons"
import classNames from "classnames"
import React, { Dispatch, useState } from "react"
import { useAppReducer } from "../../hooks/useAppReducer"
import type { AppAction } from "../../types/AppAction"
import type { LaneState, RoleState } from "../../types/AppState"
import { Hero, placeholderHero } from "../../types/Hero"
import type { Lane, Role, Team } from "../../types/Team"
import HeroPortrait from "./portrait"
import HeroTeamName from "./team/name"

function range(r: number): number[] {
  return Array.from(Array(r).keys())
}

export default function HeroTeam({ selectedHeroes, side = "radiant", size = 5, roles, lanes } : { selectedHeroes: Hero[], side?: Team, size?: number, roles: RoleState, lanes: LaneState }) {

  const dispatch: Dispatch<AppAction> = useAppReducer();
  const placeholderCount: number = size - selectedHeroes.length;

  const [copied, setCopy] = useState(false);
  const [teamName, setTeamName] = useState("My Awesome Team");

  const heroClick = (hero: Hero) => (() => dispatch({type: "deselectHero", team: side, hero: hero}));
  const onTeamNameChange = (e: React.FormEvent<HTMLInputElement>) => setTeamName(e.currentTarget.value);
  const clearTeam = () => dispatch({type: "clearTeam", team: side});
  const shareTeam = () => {
    let lanesOutput : string = "";
    for (const lane of Object.keys(lanes)) {
      lanesOutput += `\n  ${lane}: ${lanes[lane as Lane].map((hero) => hero.localized_name).join(", ")}`;
    }
    let rolesOutput : string = "";
    for (const role of Object.keys(roles)) {
      rolesOutput += `\n  ${role}: ${roles[role as Role]!.localized_name}`;
    }

    navigator.clipboard.writeText(
      `${teamName}: ` +
      selectedHeroes.map((hero) => hero.localized_name).join(" - ") +
      lanesOutput +
      rolesOutput
    );
    setCopy(true);
    setTimeout(() => setCopy(false), 2000);
  }

  function laneAssigner(hero: Hero, lane: Lane): () => void {
    let actionType: "assignLane" | "unassignLane" = "assignLane";
    if (lanes[lane].includes(hero)) {
      actionType = "unassignLane"
    }
      
    return () => dispatch({ type: actionType, hero: hero, team: side, lane: lane })
  };
  function roleAssigner(hero: Hero, role: Role): () => void {
    let actionType: "assignRole" | "unassignRole" = "assignRole";
    if (roles[role] == hero) {
      actionType = "unassignRole"
    }
      
    return () => dispatch({ type: actionType, hero: hero, team: side, role: role })
  };
  const heroHasLane = (hero: Hero, lane: Lane) => lanes[lane].includes(hero);
  const heroHasRole = (hero: Hero, role: Role) => roles[role] === hero;

  return (
    <div className="p-4 lg:w-1/2 flex flex-row flex-wrap justify-center gap-4">
      <HeroTeamName teamName={teamName} onChange={onTeamNameChange} />
      <div className="flex flex-row flex-wrap justify-center gap-4 max-h-fit">
        {selectedHeroes.map((hero) => (
          <HeroPortrait key={hero.id} hero={hero} onClick={heroClick(hero)}>
            <ul className="p-0.5 w-full flex flex-row">
              <li className={classNames("basis-1/4 hover:cursor-pointer", {"text-amber-400": heroHasLane(hero, "offlane")})} onClick={laneAssigner(hero, "offlane")}><IconCornerUpRight /></li>
              <li className={classNames("basis-1/4 hover:cursor-pointer", {"text-amber-400": heroHasLane(hero, "middle")})} onClick={laneAssigner(hero, "middle")}><IconArrowUpRight /></li>
              <li className={classNames("basis-1/4 hover:cursor-pointer", {"text-amber-400": heroHasLane(hero, "safelane")})} onClick={laneAssigner(hero, "safelane")}><IconCornerRightUp /></li>
              <li className={classNames("basis-1/4 hover:cursor-pointer", {"text-amber-400": heroHasLane(hero, "jungle")})} onClick={laneAssigner(hero, "jungle")}><IconChristmasTree /></li>
            </ul>
            <ul className="p-0.5 w-full flex flex-row">
              <li className={classNames("basis-1/5 hover:cursor-pointer", {"text-amber-400": heroHasRole(hero, "carry")})} onClick={roleAssigner(hero, "carry")}><IconDice1 /></li>
              <li className={classNames("basis-1/5 hover:cursor-pointer", {"text-amber-400": heroHasRole(hero, "mid")})} onClick={roleAssigner(hero, "mid")}><IconDice2 /></li>
              <li className={classNames("basis-1/5 hover:cursor-pointer", {"text-amber-400": heroHasRole(hero, "offlaner")})} onClick={roleAssigner(hero, "offlaner")}><IconDice3 /></li>
              <li className={classNames("basis-1/5 hover:cursor-pointer", {"text-amber-400": heroHasRole(hero, "softSupport")})} onClick={roleAssigner(hero, "softSupport")}><IconDice4 /></li>
              <li className={classNames("basis-1/5 hover:cursor-pointer", {"text-amber-400": heroHasRole(hero, "hardSupport")})} onClick={roleAssigner(hero, "hardSupport")}><IconDice5 /></li>
            </ul>
            </HeroPortrait>
        ))}
        {placeholderCount > 0 && range(placeholderCount).map((placeholderId) => (
          <HeroPortrait key={`placeholder-${placeholderId}`} hero={placeholderHero} />
        ))}
      </div>

      <div className="flex flex-row justify-center gap-4">
        <button className="rounded-full bg-pink-500 p-2 font-mono" onClick={clearTeam}>Clear Team</button>
        <button disabled={selectedHeroes.length < 5} className="w-32 disabled:opacity-50 rounded-full bg-orange-400 p-2 font-mono" onClick={shareTeam}>{copied? "Copied!" : "Share Team"}</button>
      </div>
    </div>
  )
}
