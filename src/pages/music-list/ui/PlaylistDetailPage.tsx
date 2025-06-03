import React, { ReactElement, ReactNode } from "react";

import MusicList from "@/widgets/music-list/ui/MusicList";

export interface PlaylistDetailPageProps {
	playlistId: string;
	children?: ReactNode;
}

export default function PlaylistDetailPage(
	props: PlaylistDetailPageProps
): ReactElement {
	return <MusicList playlistId={props.playlistId} />;
}
