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

const BlockBlue = localFont({
	src: "../public/fonts/BlockBlueprint.ttf",
	variable: "--font-block-blue",
	display: "swap",
});

const BoldPixels = localFont({
	src: "../public/fonts/BoldPixels.otf",
	variable: "--font-bold-pixels",
	display: "swap",
});

const MedoReg = localFont({
	src: "../public/fonts/MedodicaRegular.otf",
	variable: "--font-medoreg",
	display: "swap",
});

const Space = localFont({
	src: "../public/fonts/SpaceGrotesk-Regular.ttf",
	variable: "--font-space",
	display: "swap",
});

const Qartige = localFont({
	src: "../public/fonts/Qartige.otf",
	variable: "--font-qartige",
	display: "swap",
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
				style={{
					backgroundImage: "url('/background.png')",
					backgroundSize: "cover",
					backgroundPosition: "center"
				}}

				className={`antialiased h-screen ${BlockBlue.variable} ${BoldPixels.variable} ${MedoReg.variable} ${Space} ${Qartige.variable} bg-zinc-950 text-zinc-200`}>
				<Provider>
					{children}
				</Provider>
			</body>
		</html>
	);
}
