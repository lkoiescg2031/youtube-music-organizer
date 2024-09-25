type SnippetThumbnailKeys =
	| "default"
	| "medium"
	| "high"
	| "standard"
	| "maxres";

interface IThumbnail {
	url: string;
	width: number;
	height: number;
}

export interface INativePlaylistItem {
	kind: "youtube#playlistItem";
	etag: string;
	id: string;
	snippet: {
		publishedAt: string;
		channelId: string;
		title: string;
		description: string;
		thumbnails: Record<SnippetThumbnailKeys, IThumbnail>;
		channelTitle: string;
		videoOwnerChannelTitle: string;
		videoOwnerChannelId: string;
		playlistId: string;
		position: number;
		resourceId: {
			kind: string;
			videoId: string;
		};
	};
	contentDetails: {
		videoId: string;
		startAt: string;
		endAt: string;
		note: string;
		videoPublishedAt: string;
	};
	status: {
		privacyStatus: string;
	};
}
