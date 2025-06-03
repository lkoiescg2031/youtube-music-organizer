import { useAtomValue } from "jotai";

import { IArtistAlias } from "@/entities/artist-alias";
import {
	artistAliasDictionaryState,
	musicDictionaryState,
	INativePlaylistItem,
} from "@/entities/music";
import { IMusicAlias } from "@/entities/music-alias";

interface IUseIntegrateMusic {
	musicAlias: IMusicAlias;
	artistAlias: IArtistAlias;
}

export function useIntegrateMusic(
	musicItem?: INativePlaylistItem
): IUseIntegrateMusic {
	const _artistDic = useAtomValue(artistAliasDictionaryState);
	const _musicDic = useAtomValue(musicDictionaryState);

	return {
		musicAlias: {
			id: musicItem?.snippet.resourceId.videoId,
			// artist: musicDic[musicItem?.snippet.resourceId.videoId]?.artist,
			// title: musicDic[musicItem?.snippet.resourceId.videoId]?.title,
		},
		artistAlias: {
			// artist: musicItem?.snippet.videoOwnerChannelTitle,
			// alias: artistDic[musicItem.snippet.videoOwnerChannelTitle]?.alias,
		},
	};
}
