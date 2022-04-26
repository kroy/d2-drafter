import { Action, Team, TeamBuilderDispatch } from "../../pages/team-builder"
import HeroPortrait from "./portrait"
import HeroTeamName from "./team/name"
import { Hero, placeholderHero } from "../../types/Hero"
import React, { Dispatch, useContext, useEffect, useState } from "react"
import { siteTitle } from "../layout"

function range(r: number): number[] {
  return Array.from(Array(r).keys())
}

async function fetchRandomTeamName(heroName?: string): Promise<String> {
  let firstLetter = heroName ? heroName.charAt(0) : "";
  const adjectiveResponse : String[] = await fetch('https://random-word-form.herokuapp.com/random/adjective/' + firstLetter).then(res => res.json())
  let adjective = adjectiveResponse[0];
  adjective = adjective.charAt(0).toLocaleUpperCase().concat(adjective.substring(1))
  if (!heroName) {
    firstLetter = adjective.charAt(0);
    const nounResponse = await fetch('https://random-word-form.herokuapp.com/random/noun/' + firstLetter).then(res => res.json())
    let noun = nounResponse[0];
    heroName = noun.charAt(0).toLocaleUpperCase().concat(noun.substring(1))
  }
  let randomTeamName : string = `${adjective} ${heroName}`;
  if (randomTeamName.charAt(randomTeamName.length - 1) === "s") {
    return randomTeamName;
  }
  return randomTeamName + "s";
}

export default function HeroTeam({ selectedHeroes, side = "radiant", size = 5 } : { selectedHeroes: Hero[], side?: Team, size?: number }) {
  useEffect(() => {
    if (selectedHeroes.length === 0) {
      setTeamNamePinned(false);
    }
    if (!teamNamePinned) {
      const randomHeroName = selectedHeroes.length == 0 ? undefined : selectedHeroes[Math.floor(Math.random() * selectedHeroes.length)].localized_name
      fetchRandomTeamName(randomHeroName).then(namePiece => setTeamName(`The ${namePiece}`))
    }
  }, [selectedHeroes]);

  const dispatch: Dispatch<Action> = useContext(TeamBuilderDispatch);
  const placeholderCount: number = size - selectedHeroes.length;

  const [copied, setCopy] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamNamePinned, setTeamNamePinned] = useState(false);

  const heroClick = (hero: Hero) => (() => dispatch({type: "deselectHero", team: side, hero: hero}));
  const onTeamNameChange = (e: React.FormEvent<HTMLInputElement>) => setTeamName(e.currentTarget.value);
  const onTeamNameFocus = (e: React.FormEvent<HTMLInputElement>) => setTeamNamePinned(true);
  const clearTeam = () => dispatch({type: "clearTeam", team: side});
  const shareTeam = () => {
    navigator.clipboard.writeText(
      `${teamName}: ` +
      selectedHeroes.map((hero) => hero.localized_name).join(" - ")
    );
    setCopy(true);
    setTimeout(() => setCopy(false), 2000);
  }

  return (
    <div className="p-4 lg:w-1/2 flex flex-row flex-wrap justify-center gap-4">
      <HeroTeamName teamName={teamName} onChange={onTeamNameChange} onFocus={onTeamNameFocus} />
      <div className="flex flex-row flex-wrap justify-center gap-4 max-h-fit">
        {selectedHeroes.map((hero) => (
          <HeroPortrait key={hero.id} hero={hero} onClick={heroClick(hero)} />
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
