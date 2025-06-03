import { useEffect, useState } from "react";

import { useAtomValue } from "jotai";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import {
	IYoutubeGetListCommonResponse,
	youtubeMusicApi,
} from "@/shared/api/youtube-music-api-core";
import { useYoutubeSDKConfig } from "@/shared/libs/useYoutubeSDKConfig";
import { googleAuthState, IGoogleAuth } from "@/shared/models/youtube-login";

import { INativePlaylistItem } from "../models/native-playlist-item";

interface IGetPlaylistItemsParams {
	youtubeAPIKey: string;
	googleAuth?: IGoogleAuth;
	playlistId: string;
	pageToken?: string;
}

type GetPlaylistItems = IYoutubeGetListCommonResponse<
	"youtube#playlistItemListResponse",
	INativePlaylistItem
>;

export async function getPlaylistItems(
	params: IGetPlaylistItemsParams
): Promise<GetPlaylistItems> {
	const apiUrl = new URL(
		"https://youtube.googleapis.com/youtube/v3/playlistItems"
	);
	apiUrl.searchParams.append("part", "id");
	apiUrl.searchParams.append("part", "contentDetails");
	apiUrl.searchParams.append("part", "snippet");
	apiUrl.searchParams.append("part", "status");
	apiUrl.searchParams.append("maxResults", "50");
	apiUrl.searchParams.append("playlistId", params.playlistId);
	apiUrl.searchParams.append("key", params.youtubeAPIKey);

	if (params.pageToken) {
		apiUrl.searchParams.append("pageToken", params.pageToken);
	}

	return await youtubeMusicApi.get<GetPlaylistItems>(apiUrl, params.googleAuth);
}

interface IUseInfiniteGetPlaylistItemsQuery {
	playlistId: string;
}

export function useInfiniteGetPlaylistItemQuery(
	params: IUseInfiniteGetPlaylistItemsQuery
) {
	const queryClient = useQueryClient();

	const googleAuth = useAtomValue(googleAuthState);
	const { youtubeAPIKey } = useYoutubeSDKConfig();

	const queryKey = [
		"entities/music/apis/getPlaylistItems/useInfiniteGetPlaylistItemQuery",
		params.playlistId,
		googleAuth,
	];

	const [isAllFetching, setAllFetching] = useState<boolean>(false);
	const results = useInfiniteQuery({
		queryKey,
		queryFn: ({ pageParam }) =>
			getPlaylistItems({
				googleAuth,
				youtubeAPIKey,
				pageToken: pageParam,
				playlistId: params.playlistId,
			}),
		initialPageParam: undefined as string | undefined,
		getNextPageParam: (lastPage) => lastPage.nextPageToken,
		getPreviousPageParam: (firstPage) => firstPage.prevPageToken,
	});

	const fetchAllNextPage = (): void => {
		setAllFetching(true);
	};

	const resetQuery = (): void => {
		queryClient.resetQueries({ queryKey, exact: true });
	};

	useEffect(() => {
		if (results.fetchStatus !== "idle" || !isAllFetching) {
			return;
		}

		if (!results.hasNextPage) {
			setAllFetching(false);
			return;
		}

		results.fetchNextPage();
	}, [
		results,
		results.fetchStatus,
		results.hasNextPage,
		isAllFetching,
		setAllFetching,
	]);

	return {
		...results,
		isFetching: results.isFetching || isAllFetching,
		fetchAllNextPage,
		resetQuery,
	};
}
