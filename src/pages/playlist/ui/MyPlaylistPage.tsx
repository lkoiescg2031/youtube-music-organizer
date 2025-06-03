import React, { ReactElement, ReactNode } from "react";

import MyPlaylist from "@/widgets/playlist/ui/MyPlaylist";

interface MyPlaylistPageProps {
	children?: ReactNode;
}

export default function MyPlaylistPage(
	_props: MyPlaylistPageProps
): ReactElement {
	return <MyPlaylist />;
}
