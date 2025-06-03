import React, { ReactElement, ReactNode } from "react";

import { AuthorizedLayout, LoginConfig } from "@/pages/login";

export interface AuthorizedAppLayoutProps {
	children?: ReactNode;
}

export default function AuthorizedAppLayout(
	props: AuthorizedAppLayoutProps
): ReactElement {
	return (
		<AuthorizedLayout
			accessTokenUrl={LoginConfig.accessTokenUrl}
			redirectUrl={LoginConfig.redirectUrl}
		>
			{props.children}
		</AuthorizedLayout>
	);
}
