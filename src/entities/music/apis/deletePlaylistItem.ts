import { useAtomValue } from "jotai";

import { useMutation } from "@tanstack/react-query";

import { youtubeMusicApi } from "@/shared/api/youtube-music-api-core";
import { YOUTUBE_API_KEY } from "@/shared/config/youtube-sdk-configs";
import { googleAuthState, IGoogleAuth } from "@/shared/models/youtube-login";

interface IDeletePlaylistItem {
	itemId: string;
	googleAuth?: IGoogleAuth;
}

export async function deletePlaylistItem(
	params: IDeletePlaylistItem
): Promise<void> {
	const apiUrl = new URL(
		"https://youtube.googleapis.com/youtube/v3/playlistItems"
	);
	apiUrl.searchParams.append("id", params.itemId);
	apiUrl.searchParams.append("key", YOUTUBE_API_KEY);

	return await youtubeMusicApi.delete(apiUrl, params.googleAuth);
}

export function useDeletePlaylistItemMutation() {
	const googleAuth = useAtomValue(googleAuthState);

	return useMutation({
		mutationKey: [
			"entities/music/apis/deletePlaylistItem/useDeletePlaylistItemMutation",
			googleAuth,
		],
		mutationFn: (itemId: string) => deletePlaylistItem({ itemId, googleAuth }),
	});
}
