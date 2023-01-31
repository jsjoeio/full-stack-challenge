import React from "react"
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { Fruit } from "./api/fruit"
import { FruitContainer } from "@/components/FruitContainer"
import { FilterFruits } from "@/components/FilterFruits"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [fruits, setFruits] = React.useState<Fruit[]>([])
  const [query, setQuery] = React.useState("")
  React.useEffect(() => {
    async function fetchFruits() {
      const resp = await fetch("/api/fruit")
      const { data } = await resp.json()
      if (!ignore) {
        setFruits(data);
      }
    }

    let ignore = false;
    fetchFruits();
    return () => {
      ignore = true;
    }
  }, []);

  // listen for filter changes
  React.useEffect(() => {
    async function fetchFruits() {
      const resp = await fetch(`/api/fruit?${query}`)
      const { data } = await resp.json()
      if (!ignore) {
        setFruits(data);
      }
    }

    let ignore = false;
    fetchFruits();
    return () => {
      ignore = true;
    }
  }, [query]);

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
          <div>
            <FilterFruits query={query} setQuery={setQuery} />
          </div>
          {fruits.length > 0 && fruits.map(fruit => <FruitContainer fruit={fruit} />)}
        </div>
      </main>
    </>
  )
}
