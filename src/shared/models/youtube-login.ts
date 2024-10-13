import { atomWithStorage, createJSONStorage } from "jotai/utils";

export interface IGoogleAuth {
	access_token: string;
	expires_in: string;
	scope: string;
	state: string;
	token_type: string;
	updated_at: number;
}

export function isExpired(googleAuth?: IGoogleAuth): boolean {
	try {
		const remainTime = Number(googleAuth?.expires_in) * 1000;
		const updateAt = Number(googleAuth?.updated_at);

		return Date.now() > updateAt + remainTime;
	} catch (e: unknown) {
		console.error(e);
		return false;
	}
}

export function isLogin(googleAuth?: IGoogleAuth): boolean {
	return !!googleAuth?.access_token && !isExpired(googleAuth);
}

const googleAuthStorage = createJSONStorage<IGoogleAuth | undefined>(
	() => sessionStorage
);

export const googleAuthState = atomWithStorage<IGoogleAuth | undefined>(
	"googleAuth",
	undefined,
	googleAuthStorage
);
