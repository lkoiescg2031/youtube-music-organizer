import React, { ReactNode } from "react";

import LoginProcessPage from "@/pages/login/ui/LoginProcessPage";

interface AccessTokenPageProps {
	searchParams: {
		redirectUrl?: string;
	};
}

export default function AccessTokenPage(
	props: AccessTokenPageProps
): ReactNode {
	return <LoginProcessPage redirectUrl={props.searchParams.redirectUrl} />;
}
