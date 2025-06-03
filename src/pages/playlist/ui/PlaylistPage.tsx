import React, { ReactElement, ReactNode } from "react";

import { MyPlaylist } from "widgets/playlist";

interface PlaylistPageProps {
	children?: ReactNode;
}

export default function PlaylistPage(_props: PlaylistPageProps): ReactElement {
	return <MyPlaylist />;
}
