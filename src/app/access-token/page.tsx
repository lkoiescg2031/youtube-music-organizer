import React, { ReactNode } from "react";

import { AccessTokenPage } from "pages/login";

interface AccessTokenAppPageProps {
	searchParams: {
		redirectUrl?: string;
	};
}

export default function AccessTokenAppPage(
	props: AccessTokenAppPageProps
): ReactNode {
	return <AccessTokenPage redirectUrl={props.searchParams.redirectUrl} />;
}
