import { useAtomValue } from "jotai";

import { IArtistAlias } from "@/entities/artist-alias/models/ArtistAlias";
import { artistAliasDictionaryState } from "@/entities/music/models/artist";
import { musicDictionaryState } from "@/entities/music/models/music";
import { INativePlaylistItem } from "@/entities/music/models/native-playlist-item";
import { IMusicAlias } from "@/entities/music-alias/models/MusicAlias";

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
