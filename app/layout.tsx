import { NavHeader } from "@/components/nav-header";
import "./globals.css";
import localFont from "next/font/local";
import Provider from "@/components/providers";

const myCustomFont = localFont({
	src: [
		{
			path: "../public/fonts/dm-sans.ttf",
			weight: "400",
			style: "normal",
		},
	],
	variable: "--font-my-custom", // Optional: for CSS variable usage
	display: "swap", // Optional: controls font loading behavior
});

export const metadata = {
	other: {
		"fc:frame": JSON.stringify({
			version: "1",
			imageUrl: "https://neynar-checker.vercel.app/preview-image.png",
			button: {
				title: "Start checker",
				action: {
					type: "launch_frame",
					url: "https://neynar-checker.vercel.app",
					name: "Neynar checker",
					splashImageUrl: "https://neynar-checker.vercel.app/splash.png",
					splashBackgroundColor: "#080508",
				},
			},
		}),
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`antialiased min-h-screen ${myCustomFont.className} bg-zinc-950 text-zinc-200`}>
				<Provider>
					<NavHeader />
					{children}
				</Provider>
			</body>
		</html>
	);
}
