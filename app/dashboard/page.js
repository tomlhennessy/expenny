'use client'

import Login from "@/components/Login";
import SubscriptionForm from "@/components/SubscriptionForm";
import SubscriptionsDisplay from "@/components/SubscriptionsDisplay";
import SubscriptionSummary from "@/components/SubscriptionSummary";
import { useState } from "react";


export default function DashboardPage() {
    const isAuthenticated = true
    const [isAddEntry, setIsAddEntry] = useState(false)

    function handleToggleInput() {
      setIsAddEntry(!isAddEntry)
    }

    if (!isAuthenticated) {
      return (
        <Login />
      )
    }

    return (
      <div>
        <SubscriptionSummary />
        <SubscriptionsDisplay />
        {isAddEntry && (
          <SubscriptionForm onSubmit={() => { }} closeInput={handleToggleInput} />
        )}
      </div>
    );
  }
