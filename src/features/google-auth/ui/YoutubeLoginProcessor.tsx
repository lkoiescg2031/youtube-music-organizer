"use client";

import classNames from "classnames";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import styled from "styled-components";

import { googleAuthState, IGoogleAuth } from "shared/models/youtube-login";

interface YoutubeLoginProcessorProps {
	className?: string;
	redirectUrl?: string;
}

export default function YoutubeLoginProcessor(
	props: YoutubeLoginProcessorProps
): React.ReactElement {
	const router = useRouter();
	const setGoogleAuth = useSetAtom(googleAuthState);

	useEffect(() => {
		const loginInfo = new URLSearchParams(window.location.hash.slice(1));

		if (loginInfo.has("access_token")) {
			const loginInfoObj = Object.fromEntries(
				loginInfo.entries()
			) as unknown as IGoogleAuth;
			loginInfoObj.updated_at = Date.now();

			setGoogleAuth(loginInfoObj);
			router.replace(props.redirectUrl || "/");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<StyledYoutubeProcessor
			className={classNames("youtube-login-processor", props.className)}
		>
			로그인 정보를 가져오는 중입니다.
		</StyledYoutubeProcessor>
	);
}

const StyledYoutubeProcessor = styled.div`
	&.youtube-login-processor {
	}
`;
