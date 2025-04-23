"use client";

import React from "react";

import classNames from "classnames";
import styled from "styled-components";

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
		<StyledPlaylistDetailPage className={classNames("playlist-detail-page")}>
			<Gnb
				accessTokenUrl={props.accessTokenUrl}
				redirectUrl={props.redirectUrl}
			/>
			{isLogin(googleAuth) && <MusicList playlistId={props.playlistId} />}
		</StyledPlaylistDetailPage>
	);
}

const StyledPlaylistDetailPage = styled.div`
	&.playlist-detail-page {
		width: 100vw;
	}
`;
