import "./globals.css";
import "./fanta.css";
import Head from "./head";


export const metadata = {
  title: "Expenny ⋅ The Subscription Tracker",
  description: "Track all your subsciption analytics!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head />
      <body>
        {children}
      </body>
    </html>
  );
}
