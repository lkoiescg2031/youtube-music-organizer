import React, { ReactNode } from "react";

import QueryProvider from "@/app/providers/QueryProvider";
import StyledComponentsRegistry from "@/app/providers/StyledComponentRegistry";
import "@/app/styles/global-styles.css";

import DefaultHTMLLayout from "@/shared/layouts/DefaultHTMLLayout";


interface RootLayoutProps {
	children: ReactNode;
}

export default function RootLayout(props: Readonly<RootLayoutProps>) {
	return (
		<DefaultHTMLLayout>
			<QueryProvider>
				<StyledComponentsRegistry>{props.children}</StyledComponentsRegistry>
			</QueryProvider>
		</DefaultHTMLLayout>
	);
}
