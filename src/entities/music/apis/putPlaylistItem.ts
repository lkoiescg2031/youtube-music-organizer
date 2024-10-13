import { useAtomValue } from "jotai";

import { useMutation } from "@tanstack/react-query";

import { youtubeMusicApi } from "@/shared/api/youtube-music-api-core";
import { YOUTUBE_API_KEY } from "@/shared/config/youtube-sdk-configs";
import { googleAuthState, IGoogleAuth } from "@/shared/models/youtube-login";

interface IPutPlaylistItemPosition {
	data: {
		item: {
			id: string;
			snippet: {
				playlistId: string;
				resourceId: {
					kind: string;
					videoId: string;
				};
				position?: number;
			};
		};
		newPosition: number;
	};
	googleAuth?: IGoogleAuth;
}

export async function putPlaylistItemPosition(
	params: IPutPlaylistItemPosition
): Promise<void> {
	const apiUrl = new URL(
		"https://youtube.googleapis.com/youtube/v3/playlistItems"
	);
	apiUrl.searchParams.append("part", "id");
	apiUrl.searchParams.append("part", "snippet");
	apiUrl.searchParams.append("key", YOUTUBE_API_KEY);

	const id = params.data.item.id;
	const snippet: IPutPlaylistItemPosition["data"]["item"]["snippet"] =
		JSON.parse(JSON.stringify(params.data.item.snippet));
	snippet.position = params.data.newPosition;

	return await youtubeMusicApi.put(apiUrl, { id, snippet }, params.googleAuth);
}

export function usePutPlaylistItemPositionMutation() {
	const googleAuth = useAtomValue(googleAuthState);

	return useMutation({
		mutationKey: [
			"entities/music/apis/putPlaylistItem/usePutPlaylistItemPositionMutation",
			googleAuth,
		],
		mutationFn: (data: IPutPlaylistItemPosition["data"]) =>
			putPlaylistItemPosition({ data, googleAuth }),
	});
}
