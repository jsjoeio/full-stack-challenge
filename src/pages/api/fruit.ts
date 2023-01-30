// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ParsedUrlQuery } from "querystring";

const FRUITS = [
  {
    "name": "Apple",
    "colors": [
      "red",
      "green",
      "yellow"
    ],
    "in_season": true
  },
  {
    "name": "Orange",
    "colors": [
      "orange"
    ],
    "in_season": true
  },
  {
    "name": "Grapes",
    "colors": [
      "purple",
      "green"
    ],
    "in_season": false
  },
  {
    "name": "Lime",
    "colors": [
      "green"
    ],
    "in_season": false
  },
  {
    "name": "Banana",
    "colors": [
      "yellow"
    ],
    "in_season": false
  },
  {
    "name": "Watermelon",
    "colors": [
      "red"
    ],
    "in_season": false
  },
  {
    "name": "Blueberry",
    "colors": [
      "blue"
    ],
    "in_season": true
  },
  {
    "name": "Coconut",
    "colors": [
      "white"
    ],
    "in_season": true
  }
]

export interface FruitQuery extends ParsedUrlQuery {
  color?: string;
  name?: string;
  in_season?: string;
}

type Fruit = {
  name: string
  colors: string[]
  in_season: boolean
}

type Data = {
  data: Fruit[]
}

type Err = {
  details: string
}

type Result = Data | Err

interface FruitRequest extends NextApiRequest {
  query: FruitQuery
}

type FruitResponse = NextApiResponse<Result>

export default function handler(
  req: FruitRequest,
  res: FruitResponse
) {

  if (req.query) {
    // validate query params
    // this will be something like
    // ["color", "in_season", "hello"]
    // TODO@jsjoeio - add logic to validate here
    // if invaid query param, log warning and send warning in response
    const queryParams = Object.keys(req.query)

    const filteredData = FRUITS.filter(fruit => {
      // false means remove from array
      // true means keep in array
      let shouldKeep = true

      if (req.query.color && !fruit.colors.includes(req.query.color)) {
        shouldKeep = false
      }

      if (req.query.in_season && fruit.in_season !== Boolean(req.query.in_season)) {
        shouldKeep = false
      }

      if (req.query.name && !fruit.name.toLowerCase().includes(req.query.name.toLowerCase())) {
        shouldKeep = false
      }

      return shouldKeep
    })
    res.status(200).json({
      data: filteredData
    })
  } else {
    // send back unfiltered
    res.status(200).json({
      data: FRUITS
    })
  }
}
