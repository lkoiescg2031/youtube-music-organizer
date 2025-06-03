import { useAtomValue } from "jotai";
import { useCallback } from "react";

import {
	artistAliasDictionaryState,
	getArtist,
	getTitle,
	getUseMusicParam,
	musicDictionaryState,
	INativePlaylistItem,
} from "entities/music";

export type MusicSortKeyType = "title" | "artist" | "origin";
export type MusicSortDirectionType = "asc" | "desc";

const SORT_DIR_MAP: Record<MusicSortDirectionType, 1 | -1> = {
	asc: 1,
	desc: -1,
};

interface ISortConfig {
	sortKey: MusicSortKeyType;
	dir: MusicSortDirectionType;
}

type IUseMusicSorterReturns<T extends INativePlaylistItem> = (
	items: T[],
	config: ISortConfig
) => T[];

export function useMusicSorter<
	T extends INativePlaylistItem
>(): IUseMusicSorterReturns<T> {
	const artistDic = useAtomValue(artistAliasDictionaryState);
	const musicDic = useAtomValue(musicDictionaryState);

	const titleCompare = useCallback(
		(dir: 1 | -1) =>
			(a: T, b: T): number => {
				return (
					getTitle(getUseMusicParam(a), musicDic).localeCompare(
						getTitle(getUseMusicParam(b), musicDic)
					) * dir
				);
			},
		[musicDic]
	);

	const artistCompare = useCallback(
		(dir: 1 | -1) =>
			(a: T, b: T): number => {
				return (
					getArtist(getUseMusicParam(a), {
						musicDic,
						artistDic,
					}).localeCompare(
						getArtist(getUseMusicParam(b), {
							musicDic,
							artistDic,
						})
					) * dir
				);
			},
		[musicDic, artistDic]
	);

	const originCompare = useCallback(
		(dir: 1 | -1) =>
			(a: T, b: T): number => {
				return (a.snippet.position - b.snippet.position) * dir;
			},
		[]
	);

	const sort = useCallback(
		(items: T[], config: ISortConfig): T[] => {
			switch (config.sortKey) {
				case "title": {
					return items.sort(titleCompare(SORT_DIR_MAP[config.dir]));
				}
				case "artist": {
					return items.sort(artistCompare(SORT_DIR_MAP[config.dir]));
				}
				case "origin": {
					return items.sort(originCompare(SORT_DIR_MAP[config.dir]));
				}
			}
		},
		[titleCompare, artistCompare, originCompare]
	);

	return sort;
}
