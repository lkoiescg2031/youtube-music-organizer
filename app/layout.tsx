import React, { ReactNode } from "react";

import QueryProvider from "@/app/providers/QueryProvider";
import StyledComponentsRegistry from "@/app/providers/StyledComponentRegistry";
import "@/app/styles/global-styles.css";

import DefaultHTMLLayout from "@/shared/layouts/DefaultHTMLLayout";

import YoutubeSDKConfigProvider from "@/app/providers/YoutubeSDKConfigProvider";

interface RootLayoutProps {
	children: ReactNode;
}

export default function RootLayout(props: Readonly<RootLayoutProps>) {
	return (
		<DefaultHTMLLayout>
			<QueryProvider>
				<StyledComponentsRegistry>
					<YoutubeSDKConfigProvider
						youtubeAPIKey={process.env.YOUTUBE_API_KEY as string}
						youtubeClientId={process.env.YOUTUBE_CLIENT_ID as string}
					>
						{props.children}
					</YoutubeSDKConfigProvider>
				</StyledComponentsRegistry>
			</QueryProvider>
		</DefaultHTMLLayout>
	);
}
