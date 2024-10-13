"use client";

import React, { ReactElement, ReactNode } from "react";

import { useHydrateAtoms } from "jotai/utils";

import {
	youtubeAPIKeyState,
	youtubeClientIdState,
} from "@/shared/libs/useYoutubeSDKConfig";

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
