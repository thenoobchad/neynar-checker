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
      <body className={`antialiased`}>
        <NavHeader/>
				{children}
			</body>
		</html>
	);
}
