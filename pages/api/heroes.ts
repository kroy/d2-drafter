// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Hero } from '../../types/Hero';
import { OpenDota } from 'opendota.js';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{heroes: Hero[]}>
) {
  const opendota = new OpenDota(process.env.OPENDOTA_API_KEY);
  const heroes: Hero[] = await opendota.getHeroes()
  res.status(200).json({ heroes: heroes });
}
