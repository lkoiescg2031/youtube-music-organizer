import React from "react";

import PlaylistDetailPage from "@/pages/playlist/ui/PlaylistDetailPage";

export interface PlayListDetailPageProps {
	params: {
		playlistId: string;
	};
}

export default function PlayListDetailPage(
	props: PlayListDetailPageProps
): React.ReactElement {
	const hostUrl = process.env.HOST_URL as string;

	const accessTokenUrl = new URL(hostUrl);
	accessTokenUrl.pathname = "/access-token";

	const redirectUrl = new URL(hostUrl);
	redirectUrl.pathname = "/";

	return (
		<PlaylistDetailPage
			key={`${props.params.playlistId}-${Date.now()}`}
			accessTokenUrl={accessTokenUrl.toString()}
			redirectUrl={redirectUrl.toString()}
			playlistId={props.params.playlistId}
		/>
	);
}
