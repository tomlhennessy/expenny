'use client'

import { useContext, useState } from "react"

const AuthContext = createContext

export function useAuth() {
    return useContext(AuthContext)
}

const value = {
    currentUser, userData, loading
}

export function AuthProvider(props) {
    const { children } = props

    const [currentUser, setCurrentUser] = useState(null)
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
