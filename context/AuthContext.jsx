'use client'

import { db } from "@/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { useContext, useState, useEffect } from "react"

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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            try {
                setLoading(true)
                setCurrentUser(user)

                if (!user) return

                // oh we found a user, lets check the database
                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)
                console.log('Fetching user data')

                let firebaseData = { subscriptions: [] } // this is the default data for a new user

                if (docSnap.exists()) {
                    console.log('Found user data')
                    firebaseData = docSnap.data()
                }
                setUserData(firebaseData)
                setLoading(false)

            } catch (err) {
                console.log(err.message)
            }
        })
        return unsubscribe
    }, [])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
