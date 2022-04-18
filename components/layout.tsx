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
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
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
