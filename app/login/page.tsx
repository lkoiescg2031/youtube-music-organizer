import React, { ReactNode } from "react";

import LoginPage from "@/pages/login/ui/LoginPage";

export default function LoginServicePage(): ReactNode {
	const hostUrl = process.env.HOST_URL as string;

	const accessTokenUrl = new URL(hostUrl);
	accessTokenUrl.pathname = "/access-token";

	const redirectUrl = new URL(hostUrl);
	redirectUrl.pathname = "/";

	return (
		<LoginPage
			accessTokenUrl={accessTokenUrl.toString()}
			redirectUrl={redirectUrl.toString()}
		/>
	);
}
