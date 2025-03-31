'use client'

import { auth, db } from "@/firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { useContext, useState, useEffect } from "react"

const AuthContext = createContext

export function useAuth() {
    return useContext(AuthContext)
}


export function AuthProvider(props) {
    const { children } = props

    const [currentUser, setCurrentUser] = useState(null)
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        setCurrentUser(null)
        setUserData(null)
        return signOut(auth)
    }

    async function handleAddSubscription(newSubscription) {
        // modify the local state (global context)
        const newSubscriptions = [ ...userData.subscriptions, newSubscription ]
        setUserData({ subscriptions: newSubscriptions })

        // write the changes to firebase db (asynchronous)
    }

    async function handleEditSubscription(index) {
        // before we delete, make sure we open up the inpout and prefill all the values with the entry we are going to edit


        // look up subscription at that index and delete it
        // use the delete handler

    }

    async function handleDeleteSubscription(index) {
        // delete the entry at that index
        const newSubscriptions = userData.subscriptions.filter((val, valIndex) => {
            return valIndex != index
        })
        setUserData({ subscriptions: newSubscriptions })
    }

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
                let firebaseData = { subscriptions }
                // let firebaseData = { subscriptions: [] } // this is the default data for a new user

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
