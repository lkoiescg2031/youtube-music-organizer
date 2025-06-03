import React, { ReactNode } from "react";

import LoginConfig from "@/pages/login/config/LoginConfig";
import LoginPage from "@/pages/login/ui/LoginPage";

export default function LoginServicePage(): ReactNode {
	return (
		<LoginPage
			accessTokenUrl={LoginConfig.accessTokenUrl}
			redirectUrl={LoginConfig.redirectUrl}
		/>
	);
}
