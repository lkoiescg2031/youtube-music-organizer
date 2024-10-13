import { useMutation } from "@tanstack/react-query";

import { useAtomValue } from "jotai";

import { youtubeMusicApi } from "@/shared/api/youtube-music-api-core";
import { useYoutubeSDKConfig } from "@/shared/libs/useYoutubeSDKConfig";
import { googleAuthState, IGoogleAuth } from "@/shared/models/youtube-login";

interface IDeletePlaylistItem {
	itemId: string;
	youtubeAPIKey: string;
	googleAuth?: IGoogleAuth;
}

export async function deletePlaylistItem(
	params: IDeletePlaylistItem
): Promise<void> {
	const apiUrl = new URL(
		"https://youtube.googleapis.com/youtube/v3/playlistItems"
	);
	apiUrl.searchParams.append("id", params.itemId);
	apiUrl.searchParams.append("key", params.youtubeAPIKey);

	return await youtubeMusicApi.delete(apiUrl, params.googleAuth);
}

export function useDeletePlaylistItemMutation() {
	const googleAuth = useAtomValue(googleAuthState);

	const { youtubeAPIKey } = useYoutubeSDKConfig();

	return useMutation({
		mutationKey: [
			"entities/music/apis/deletePlaylistItem/useDeletePlaylistItemMutation",
			googleAuth,
		],
		mutationFn: (itemId: string) =>
			deletePlaylistItem({ itemId, googleAuth, youtubeAPIKey }),
	});
}
