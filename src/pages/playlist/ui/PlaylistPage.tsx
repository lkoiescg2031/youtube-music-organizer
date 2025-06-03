import React, { ReactElement, ReactNode } from "react";

import MyPlaylist from "@/widgets/playlist/ui/MyPlaylist";

interface PlaylistPageProps {
	children?: ReactNode;
}

export default function PlaylistPage(_props: PlaylistPageProps): ReactElement {
	return <MyPlaylist />;
}
