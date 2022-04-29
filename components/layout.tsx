import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const name = 'Kiron'
export const siteTitle = 'Next.js Sample Website'

export default function Layout({
  children,
  home
}: {
  children: React.ReactNode
  home?: boolean
}) {
  return (
    <div className="">
      <Head>
        <link rel="icon" href="/sand_king_icon.ico" />
        <meta property="og:description" content="Practice drafting and building teams for Dota 2"/>
        <meta property="og:title" content="Dota 2 Drafter"/>
        <meta property="og:image" content="https://d2-drafter.vercel.app/images/sand_king.png"/>
        <meta
          name="description"
          content="Practice drafting and building teams for Dota 2"
        />
      </Head>
      <header>
      </header>
      <main>{children}</main>
      {!home && (
        <div>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
