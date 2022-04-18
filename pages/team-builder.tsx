import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layout";
import { GetStaticProps } from 'next';
import type { Hero } from '../types/Hero';
import { OpenDota } from 'opendota.js';
import heroes from "../fixtures/hero_fixture";

export default function TeamBuilder({ heroes } : {
  heroes: Hero[]
}) {  
  const strHeroes = heroes.filter((hero : Hero) => hero.primary_attr == "str");
  const agiHeroes = heroes.filter((hero : Hero) => hero.primary_attr == "agi");
  const intHeroes = heroes.filter((hero : Hero) => hero.primary_attr == "int");

  return (
    <Layout>
      <Head>
        <title>Dota2 Team Builder</title>
      </Head>
      <section className="grid grid-cols-3 grid-flow-row gap-4 max-w-fit">
        {strHeroes.map((hero: Hero) => (
          <div className="max-w-fit" key={hero.id}>
            <Image
              priority
              src="/images/sand_king.png"
              height={80}
              width={100}
            />
          </div>
        ))
        }
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<{heroes: Hero[]}> = async () => {
  const opendota = new OpenDota(process.env.OPENDOTA_API_KEY);
  const heroData = await opendota.getHeroes();

  return {
    props: { heroes: heroData }
  }
}