'use client'

import { auth, db } from "@/firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { useContext, useState, useEffect, createContext } from "react"

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}


export function AuthProvider(props) {
    const { children } = props

    const [currentUser, setCurrentUser] = useState(null)
    const [userData, setUserData] = useState({ subscriptions: []})
    const [loading, setLoading] = useState(false)

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    async function logout() {
        try {
            await signOut(auth)
            setCurrentUser(null)
            setUserData({ subscriptions: [] })
        } catch (err) {
            console.log('Logout error:', err.message)
        }
    }


    async function saveToFirebase(data) {
        try {
            if (!currentUser) return
            const userRef = doc(db, 'users', currentUser.uid)
            await setDoc(userRef, {
                subscriptions: data
            }, { merge: true })
        } catch (err) {
            console.log('Error saving to Firebase:', err.message)
        }
    }


    async function handleAddSubscription(newSubscription) {
        // modify the local state (global context)
        if (userData.subscriptions.length > 30) { return }

        const newSubscriptions = [ ...userData.subscriptions, newSubscription ]
        setUserData({ subscriptions: newSubscriptions })

        // write the changes to firebase db (asynchronous)
        await saveToFirebase(newSubscriptions)
    }

    async function handleDeleteSubscription(index) {
        // delete the entry at that index
        const newSubscriptions = userData.subscriptions.filter((val, valIndex) => {
            return valIndex != index
        })
        setUserData({ subscriptions: newSubscriptions })

        await saveToFirebase(newSubscriptions)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            try {
                setCurrentUser(user)

                if (!user) return

                // oh we found a user, lets check the database
                setLoading(true)

                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)
                console.log('Fetching user data')
                // let firebaseData = { subscriptions }
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

    const value = {
        currentUser, userData, loading, signup, login, logout, handleAddSubscription, handleDeleteSubscription
    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
