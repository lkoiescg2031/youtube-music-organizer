import { atom } from "jotai";

import { ARTIST_ALIAS_DICTIONARY } from "../config/custom-artist-dic";

export type ArtistAlias = Record<string, string>;

export const artistAliasDictionaryState = atom<ArtistAlias>(
	ARTIST_ALIAS_DICTIONARY
);
