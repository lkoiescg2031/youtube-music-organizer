import { YoutubeThumbnails } from "@/shared/models/youtube-thumbnail";

export type NativePodcastStatus = "enabled" | "disabled" | "unspecified";

export type LocalizationKeys =
	| "ar-SA"
	| "cs-CZ"
	| "da-DK"
	| "de-DE"
	| "el-GR"
	| "en-AU"
	| "en-GB"
	| "en-IE"
	| "en-US"
	| "en-ZA"
	| "es-ES"
	| "es-MX"
	| "fi-FI"
	| "fr-CA"
	| "fr-FR"
	| "he-IL"
	| "hi-IN"
	| "hu-HU"
	| "id-ID"
	| "it-IT"
	| "ja-JP"
	| "ko-KR"
	| "nl-BE"
	| "nl-NL"
	| "no-NO"
	| "pl-PL"
	| "pt-BR"
	| "pt-PT"
	| "ro-RO"
	| "ru-RU"
	| "sk-SK"
	| "sv-SE"
	| "th-TH"
	| "tr-TR"
	| "zh-CN"
	| "zh-HK"
	| "zh-TW";

export interface ILocalization {
	title: string;
	description: string;
}

export interface INativePlaylist {
	kind: "youtube#playlist";
	etag: string;
	id: string;
	snippet: {
		publishedAt: string;
		channelId: string;
		title: string;
		description: string;
		thumbnails: YoutubeThumbnails;
		channelTitle: string;
		defaultLanguage: string;
		localized: {
			title: string;
			description: string;
		};
	};
	status: {
		privacyStatus: "private" | "public" | string;
		podcastStatus: NativePodcastStatus;
	};
	contentDetails: {
		itemCount: number;
	};
	player: {
		embedHtml: string;
	};
	localizations: Record<LocalizationKeys, ILocalization>;
}
