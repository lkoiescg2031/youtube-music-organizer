import React from "react";

import PlaylistDetailPage from "@/pages/music-list/ui/PlaylistDetailPage";

export interface PlayListDetailPageProps {
	params: {
		playlistId: string;
	};
}

export default function PlayListDetailPage(
	props: PlayListDetailPageProps
): React.ReactElement {
	return (
		<PlaylistDetailPage
			key={`${props.params.playlistId}-${Date.now()}`}
			playlistId={props.params.playlistId}
		/>
	);
}
