# Expenny – The Subscription Tracker 💸

**Track, manage, and stay on top of your subscriptions in real-time.**  
A full-stack Next.js + Firebase app with secure auth, real-time updates, and insightful monthly analytics.

[🔗 Live Demo](https://subscription-tracking.netlify.app/) 

---

## 📌 Overview

Expenny helps users track recurring expenses like streaming services, memberships, and app subscriptions. It provides live data updates, secure logins, and a dashboard with meaningful insights — all built using Firebase and Next.js App Router.

This project demonstrates key full-stack concepts: authentication, database design, state management, and frontend logic.
---

## 🚀 Features

- 🔐 **User Login** with Firebase Authentication  
- 📊 **Real-Time Dashboard** with:
  - Total monthly cost  
  - Most expensive subscription  
  - Subscription categories  
  - Optional notes  
- ➕ Add/edit/delete subscriptions  
- 🔄 Seamless navigation with Next.js App Router  
- 📱 Fully responsive UI  

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React 
- **Backend & Auth:** Firebase Authentication, Firestore  
- **Deployment:** Netlify  

---

## 🧩 Challenges & Solutions

- **Realtime Database Sync:**  
  Used Firestore snapshot listeners to instantly reflect changes across sessions and keep UI state consistent.

- **Dashboard Metrics:**  
  Implemented logic to calculate monthly costs, sort data by price, and categorise subscriptions — helping users understand their spending.

- **User Experience:**  
  Prioritised a clean, mobile-friendly UI with clear calls to action and instant feedback on data changes.

---

## 📈 Future Improvements

- 🧱 **Rebuilding Backend in .NET (In Progress):**  
  This transition will improve backend control and scalability. It also separates concerns more clearly than Firebase and allows stronger data validation and API design.

- 📊 Add monthly expense charts  
- 🔔 Set up reminders for upcoming renewals  

