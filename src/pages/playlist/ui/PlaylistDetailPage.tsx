"use client";

import React from "react";

import { useAtomValue } from "jotai";

import Gnb from "@/widgets/gnb/ui/Gnb";
import MusicList from "@/widgets/playlist/ui/MusicList";

import { googleAuthState, isLogin } from "@/shared/models/youtube-login";

export interface PlaylistDetailPageProps {
	playlistId: string;
	accessTokenUrl: string;
	redirectUrl: string;
}

export default function PlaylistDetailPage(
	props: PlaylistDetailPageProps
): React.ReactElement {
	const googleAuth = useAtomValue(googleAuthState);

	return (
		<>
			<Gnb
				accessTokenUrl={props.accessTokenUrl}
				redirectUrl={props.redirectUrl}
			/>
			{isLogin(googleAuth) && <MusicList playlistId={props.playlistId} />}
		</>
	);
}
