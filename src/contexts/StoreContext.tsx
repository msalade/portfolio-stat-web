import React, { createContext, FC } from 'react';

import store, { TStore } from '../Mobx';

export const StoreContext = createContext<TStore>({} as TStore);

const StoreProvider: FC = ({ children }) => (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
);

export default StoreProvider;
