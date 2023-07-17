"use client"

import { store } from "app/lib/redux/store.jsx"
import { Provider } from "react-redux"

export function ReduxProvider({ children }) {
    return <Provider store={store}>{children}</Provider>
}