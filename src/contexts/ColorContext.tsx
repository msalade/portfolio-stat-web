import React, { useEffect, useState, createContext, FC } from 'react';

export const ColorContext = createContext<{ [key: string]: string }>({});

const randomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const ColorProvider: FC<{ keys: string[] }> = ({ children, keys }) => {
    const [colors, setColors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (keys) {
            let newColors: any = {};

            keys.forEach(key => {
                newColors[key] = randomColor();
            });

            setColors(newColors);
        }
    }, [keys]);

    return (
        <ColorContext.Provider value={colors}>{children}</ColorContext.Provider>
    );
};

export default ColorProvider;
