import React from "react"
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { Fruit } from "./api/fruit"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [fruits, setFruits] = React.useState<Fruit[]>([])
  React.useEffect(() => {
    async function fetchFruits() {
      const resp = await fetch("/api/fruit")
      const result = await resp.json()
      if (!ignore) {
        setFruits(result);
      }
    }

    let ignore = false;
    fetchFruits();
    return () => {
      ignore = true;
    }
  }, [fruits]);

  return (
    <>
      <Head>
        <title>Fruit app</title>
        <meta name="description" content="Fruit app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={inter.className}>
          <h1>Hello world</h1>
        </div>
      </main>
    </>
  )
}
