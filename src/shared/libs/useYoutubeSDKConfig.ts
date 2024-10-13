import { atom, useAtomValue } from "jotai";

export const youtubeClientIdState = atom<string>();
export const youtubeAPIKeyState = atom<string>();

interface IUseYoutubeSDKConfigReturns {
	youtubeClientId: string;
	youtubeAPIKey: string;
}

export function useYoutubeSDKConfig(): IUseYoutubeSDKConfigReturns {
	const youtubeClientId = useAtomValue(youtubeClientIdState);
	const youtubeAPIKey = useAtomValue(youtubeAPIKeyState);

	if (!youtubeClientId) {
		throw "youtube client id did not found";
	}

	if (!youtubeAPIKey) {
		throw "youtube api key did not found";
	}

	return {
		youtubeClientId,
		youtubeAPIKey,
	};
}
