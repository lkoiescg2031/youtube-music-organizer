import React from "react";

import { YoutubeLoginProcessor } from "@/features/google-auth";

export interface AccessTokenPageProps {
	redirectUrl?: string;
}

export default function AccessTokenPage(
	props: AccessTokenPageProps
): React.ReactElement {
	return <YoutubeLoginProcessor redirectUrl={props.redirectUrl} />;
}
