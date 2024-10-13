export type YoutubeThumbnailKeys =
	| "default"
	| "medium"
	| "high"
	| "standard"
	| "maxres";

export interface IYoutubeThumbnail {
	url: string;
	width: number;
	height: number;
}

export type YoutubeThumbnails = Partial<
	Record<YoutubeThumbnailKeys, IYoutubeThumbnail>
>;
