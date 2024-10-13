import React from "react";

import YoutubeLoginProcessor from "@/features/google-auth/ui/YoutubeLoginProcessor";

export interface LoginProcessPageProps {
	redirectUrl?: string;
}

export default function LoginProcessPage(
	props: LoginProcessPageProps
): React.ReactElement {
	return <YoutubeLoginProcessor redirectUrl={props.redirectUrl} />;
}
