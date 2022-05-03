import { GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";
import convertToSteam32 from "../../util/steam-id-converters";
import { OpenDota } from "opendota.js";

export default function Games({ player } : { player: { id: string, nickname: string, recentMatches: { matchId: number, heroId: number}[] } }) {
  return (
  <div>{player.nickname}
    {player.recentMatches.map((match) => (<div key={match.matchId}>{match.matchId} {match.heroId}</div>)) }
  </div>);
}

export const getServerSideProps: GetServerSideProps<{player: {id: string, nickname: string }}> = async ({req}) => {
  const prisma = new PrismaClient();
  const player = await prisma.steamAccount.findFirst({
    where: {
      nickname: "kroy",
    },
    rejectOnNotFound: true,
  });

  const opendota = new OpenDota(process.env.OPENDOTA_API_KEY);
  const recentMatches = await opendota.getRecentMatches(convertToSteam32(player.steam_id));
  return { props: {player: {id: player.id, nickname: player.nickname, recentMatches: recentMatches.map((match: {match_id: string, hero_id: string}) => {return { matchId: match["match_id"], heroId: match["hero_id"]}}) }}}
}