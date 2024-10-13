import React, { ReactElement } from "react";

import MyPlaylistPage from "@/pages/playlist/ui/MyPlaylistPage";

export default function PlaylistSelectHomePage(): ReactElement {
	const hostUrl = process.env.HOST_URL as string;

	const accessTokenUrl = new URL(hostUrl);
	accessTokenUrl.pathname = "/access-token";

	const redirectUrl = new URL(hostUrl);
	redirectUrl.pathname = "/";

	return (
		<MyPlaylistPage
			accessTokenUrl={accessTokenUrl.toString()}
			redirectUrl={redirectUrl.toString()}
		/>
	);
}
