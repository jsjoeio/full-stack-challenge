import { Fruit } from '@/pages/api/fruit';
import React, { useEffect, useState } from 'react';

type FilterProps = {
    query: string
    setQuery: (query: string) => void
};

type Season = "either" | "in_season" | "not_in_season"

export const FilterFruits = ({ query, setQuery }: FilterProps) => {
    const [name, setName] = useState('');
    const [isCheckedNotInSeason, setIsCheckedNotInSeason] = useState<boolean>(false);
    const [isCheckedInSeason, setIsCheckedInSeason] = useState<boolean>(false);
    const [season, setSeason] = useState<Season>("either");
    const [color, setColor] = useState('');

    // NOTES
    /*
    what are the states?
    initial - nothing checked
    in_season - checked or not
    not_in_season - checked or not 
    both - essentially the same as initial 

    */

    useEffect(() => {
        let query = new URLSearchParams()
        if (name) {
            query.append("name", name)
        }

        if (isCheckedInSeason) {
            query.append("in_season", "true")
        }

        if (isCheckedNotInSeason) {
            query.append("in_season", "false")
        }

        if (isCheckedInSeason && isCheckedNotInSeason) {
            query.delete("in_season")
        }

        if (color) {
            query.append("color", color)
        }

        setQuery(query.toString())
    }, [name, isCheckedInSeason, isCheckedNotInSeason, color])

    return (
        <div>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Filter by fruit name"
            />
            <div>
                <input
                    type="checkbox"
                    name="in_season"
                    id="in_season_yes"
                    checked={isCheckedInSeason === true}
                    onChange={() => setIsCheckedInSeason(!isCheckedInSeason)
                    }
                />
                <label htmlFor="in_season_yes">In season</label>
                <input
                    type="checkbox"
                    name="in_season"
                    id="in_season_no"
                    checked={isCheckedNotInSeason === true}
                    onChange={() => setIsCheckedNotInSeason(!isCheckedNotInSeason)}
                />
                <label htmlFor="in_season_no">Not in season</label>
            </div>
            <select value={color} onChange={(e) => setColor(e.target.value)}>
                <option value="">Filter by color</option>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
            </select>
        </div>
    );
};
