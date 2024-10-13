import { useAtomValue } from "jotai";

import { useInfiniteQuery } from "@tanstack/react-query";

import { INativePlaylist } from "@/entities/playlist/models/native-playlist";

import {
	youtubeMusicApi,
	IYoutubeGetListCommonResponse,
} from "@/shared/api/youtube-music-api-core";
import { useYoutubeSDKConfig } from "@/shared/libs/useYoutubeSDKConfig";
import { googleAuthState, IGoogleAuth } from "@/shared/models/youtube-login";

interface IGetMyPlaylistParams {
	youtubeAPIKey: string;
	googleAuth?: IGoogleAuth;
	pageToken?: string;
}

type GetMyPlaylist = IYoutubeGetListCommonResponse<
	"youtube#playlistListResponse",
	INativePlaylist
>;

export async function getMyPlaylist(
	params: IGetMyPlaylistParams
): Promise<GetMyPlaylist> {
	const apiUrl = new URL("https://www.googleapis.com/youtube/v3/playlists");
	apiUrl.searchParams.append("part", "id");
	apiUrl.searchParams.append("part", "contentDetails");
	apiUrl.searchParams.append("part", "player");
	apiUrl.searchParams.append("part", "snippet");
	apiUrl.searchParams.append("part", "status");
	apiUrl.searchParams.append("mine", "true");
	apiUrl.searchParams.append("maxResults", "50");
	apiUrl.searchParams.append("key", params.youtubeAPIKey);

	if (params.pageToken) {
		apiUrl.searchParams.append("pageToken", params.pageToken);
	}

	return await youtubeMusicApi.get<GetMyPlaylist>(apiUrl, params.googleAuth);
}

export function useInfiniteGetMyPlaylistQuery() {
	const { youtubeAPIKey } = useYoutubeSDKConfig();
	const googleAuth = useAtomValue(googleAuthState);

	const results = useInfiniteQuery({
		queryKey: ["entities/playlist/apis/playlist/getMyPlaylist", googleAuth],
		queryFn: ({ pageParam }) =>
			getMyPlaylist({ youtubeAPIKey, googleAuth, pageToken: pageParam }),
		initialPageParam: undefined as string | undefined,
		getNextPageParam: (lastPage) => lastPage.nextPageToken,
		getPreviousPageParam: (firstPage) => firstPage.prevPageToken,
	});

	return results;
}
