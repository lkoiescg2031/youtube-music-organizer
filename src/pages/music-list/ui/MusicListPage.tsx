import React, { ReactElement, ReactNode } from "react";

import MusicList from "@/widgets/music-list/ui/MusicList";

export interface MusicListPageProps {
	playlistId: string;
	children?: ReactNode;
}

export default function MusicListPage(props: MusicListPageProps): ReactElement {
	return <MusicList playlistId={props.playlistId} />;
}
