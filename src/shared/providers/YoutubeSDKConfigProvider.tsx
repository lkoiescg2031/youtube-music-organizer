"use client";

import { useHydrateAtoms } from "jotai/utils";
import React, { ReactElement, ReactNode } from "react";


import {
	youtubeAPIKeyState,
	youtubeClientIdState,
} from "../libs/useYoutubeSDKConfig";

export interface YoutubeSDKConfigProviderProps {
	children?: ReactNode;
	youtubeClientId: string;
	youtubeAPIKey: string;
}

export default function YoutubeSDKConfigProvider(
	props: YoutubeSDKConfigProviderProps
): ReactElement {
	useHydrateAtoms([
		[youtubeClientIdState, props.youtubeClientId],
		[youtubeAPIKeyState, props.youtubeAPIKey],
	]);

	return <>{props.children}</>;
}
