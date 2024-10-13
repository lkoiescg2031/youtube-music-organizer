"use client";

import React, { ReactElement } from "react";

import classNames from "classnames";
import styled from "styled-components";

import { useAtomValue } from "jotai";

import Gnb from "@/widgets/gnb/ui/Gnb";
import LoginForm from "@/widgets/login/ui/LoginForm";
import MyPlaylist from "@/widgets/playlist/ui/MyPlaylist";

import { googleAuthState, isLogin } from "@/shared/models/youtube-login";

interface MyPlaylistPageProps {
	accessTokenUrl: string;
	redirectUrl?: string;
}

export default function MyPlaylistPage(
	props: MyPlaylistPageProps
): ReactElement {
	const googleAuth = useAtomValue(googleAuthState);

	return (
		<StyledPlaylistSelectPage className={classNames("my-playlist-page")}>
			<Gnb
				accessTokenUrl={props.accessTokenUrl}
				redirectUrl={props.redirectUrl}
			/>
			{isLogin(googleAuth) ? (
				<MyPlaylist />
			) : (
				<LoginForm
					accessTokenUrl={props.accessTokenUrl}
					redirectUrl={props.redirectUrl}
				/>
			)}
		</StyledPlaylistSelectPage>
	);
}

const StyledPlaylistSelectPage = styled.div`
	&.my-playlist-page {
		width: 100vw;
	}
`;
