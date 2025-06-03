import React, { ReactElement, ReactNode } from "react";

import LoginConfig from "@/pages/login/config/LoginConfig";
import LoginLayout from "@/pages/login/ui/LoginLayout";

export interface LoginCheckLayoutProps {
	children?: ReactNode;
}

export default function LoginCheckLayout(
	props: LoginCheckLayoutProps
): ReactElement {
	return (
		<LoginLayout
			accessTokenUrl={LoginConfig.accessTokenUrl}
			redirectUrl={LoginConfig.redirectUrl}
		>
			{props.children}
		</LoginLayout>
	);
}
