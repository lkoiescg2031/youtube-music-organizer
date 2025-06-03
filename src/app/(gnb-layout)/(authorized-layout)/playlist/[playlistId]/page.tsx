import React, { ReactElement } from "react";

import { MusicListPage } from "@/pages/music-list";

export interface MusicListAppPageProps {
	params: {
		playlistId: string;
	};
}

export default function MusicListAppPage(
	props: MusicListAppPageProps
): ReactElement {
	return (
		<MusicListPage
			key={`${props.params.playlistId}-${Date.now()}`}
			playlistId={props.params.playlistId}
		/>
	);
}
