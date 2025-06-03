import React, { ReactElement, ReactNode } from "react";

import DefaultGnbLayout from "@/pages/gnb/ui/DefaultGnbLayout";
import LoginConfig from "@/pages/login/config/LoginConfig";

export interface GnbLayoutProps {
	children?: ReactNode;
}

export default function GnbLayout(props: GnbLayoutProps): ReactElement {
	return (
		<DefaultGnbLayout
			accessTokenUrl={LoginConfig.accessTokenUrl}
			redirectUrl={LoginConfig.redirectUrl}
		>
			{props.children}
		</DefaultGnbLayout>
	);
}
