import React, { ReactNode } from "react";

import { LoginConfig, LoginPage } from "@/pages/login";

export default function LoginAppPage(): ReactNode {
	return (
		<LoginPage
			accessTokenUrl={LoginConfig.accessTokenUrl}
			redirectUrl={LoginConfig.redirectUrl}
		/>
	);
}
