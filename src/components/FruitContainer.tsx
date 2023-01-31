import React from 'react';
import { Fruit } from '@/pages/api/fruit';

// Co-written with ChatGPT
export const FruitContainer = ({ fruit }: { fruit: Fruit }) => {
    return (
        <div>
            <h2>{fruit.name}</h2>
            <ul>
                {fruit.colors.map((color) => (
                    <li key={color}>{color}</li>
                ))}
            </ul>
            <p>
                {fruit.in_season ? 'In Season' : 'Not In Season'}
            </p>
        </div>
    );
};
