import "./globals.css";
import { Inter } from "next/font/google"

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        {children}
      </body>
    </html>
  );
}
