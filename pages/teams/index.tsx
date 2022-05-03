import { PlayerTeam, PrismaClient } from "@prisma/client";
import { GetStaticProps } from "next";

export default function TeamsIndex({ teams } : { teams: PlayerTeam[] }) {
  return (<div>
    {teams.map((team) => (<div key={team.id}>{team.name}</div>))}
  </div>)
}

export const getStaticProps: GetStaticProps<{teams: PlayerTeam[]}> = async () => {
  const prisma = new PrismaClient();
  const teams = await prisma.playerTeam.findMany()
  return {props: { teams: teams }};
}