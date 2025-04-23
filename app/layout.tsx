import React, { ReactNode } from "react";

import QueryProvider from "@/app/providers/QueryProvider";
import StyledComponentsRegistry from "@/app/providers/StyledComponentRegistry";
import YoutubeSDKConfigProvider from "@/app/providers/YoutubeSDKConfigProvider";
import "@/app/styles/global-styles.css";

import DefaultHTMLLayout from "@/shared/layouts/DefaultHTMLLayout";
import Overlay from "@/shared/libs/overlay";

interface RootLayoutProps {
	children: ReactNode;
}

export default function RootLayout(props: Readonly<RootLayoutProps>) {
	return (
		<DefaultHTMLLayout>
			<QueryProvider>
				<StyledComponentsRegistry>
					<Overlay>
						<YoutubeSDKConfigProvider
							youtubeAPIKey={process.env.YOUTUBE_API_KEY as string}
							youtubeClientId={process.env.YOUTUBE_CLIENT_ID as string}
						>
							{props.children}
						</YoutubeSDKConfigProvider>
					</Overlay>
				</StyledComponentsRegistry>
			</QueryProvider>
		</DefaultHTMLLayout>
	);
}
