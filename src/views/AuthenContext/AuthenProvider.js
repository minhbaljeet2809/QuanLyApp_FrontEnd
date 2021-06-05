import React, { useContext, createContext, useState } from 'react';


const authContent = createContext();

export function ProviderAuth({ children }) {
    const auth = ""

    return (
        <authContent.Provider value={auth}>
            {children}
        </authContent.Provider>
    );
}

export const useAuthContext = () => useContext(authContent);