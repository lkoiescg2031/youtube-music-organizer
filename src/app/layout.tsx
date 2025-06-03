import React, { ReactNode } from "react";

import DefaultHTMLLayout from "@/shared/layouts/DefaultHTMLLayout";
import Overlay from "@/shared/libs/overlay";
import QueryProvider from "@/shared/providers/QueryProvider";
import StyledComponentsRegistry from "@/shared/providers/StyledComponentRegistry";
import YoutubeSDKConfigProvider from "@/shared/providers/YoutubeSDKConfigProvider";
import "@/shared/styles/global-styles.css";

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
