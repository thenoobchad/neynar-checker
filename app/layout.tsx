"use client";

import { NavHeader } from "@/components/nav-header";
import "./globals.css";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang="en">
      <body className={`antialiased min-h-screen`}>
        <NavHeader/>
				{children}
			</body>
		</html>
	);
}
