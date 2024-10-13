import { IGoogleAuth } from "@/shared/models/youtube-login";

export interface IYoutubeGetListCommonResponse<Kind extends string, Item> {
	kind: Kind;
	etag: string;
	nextPageToken?: string;
	prevPageToken?: string;
	pageInfo: {
		totalResults: number;
		resultsPerPage: number;
	};
	items: Item[];
}

async function getApi<Response>(
	url: URL,
	googleAuth?: IGoogleAuth
): Promise<Response> {
	if (!googleAuth) {
		return Promise.reject({
			code: 0,
			message: "cannot find google auth data",
		});
	}

	const result = await fetch(url, {
		method: "GET",
		headers: {
			Accept: "application/json",
			Authorization: `${googleAuth.token_type} ${googleAuth.access_token}`,
		},
	});

	if (!result.ok) {
		return Promise.reject({ code: result.status, detail: result.json() });
	}

	return result.json();
}

async function putApi<Params, Response>(
	url: URL,
	param: Params,
	googleAuth?: IGoogleAuth
): Promise<Response> {
	if (!googleAuth) {
		return Promise.reject({
			code: 0,
			message: "cannot find google auth data",
		});
	}

	const result = await fetch(url, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			Authorization: `${googleAuth.token_type} ${googleAuth.access_token}`,
		},
		body: JSON.stringify(param),
	});

	if (!result.ok) {
		return Promise.reject({ code: result.status, detail: result.json() });
	}

	return result.json();
}

async function deleteApi<Response>(
	url: URL,
	googleAuth?: IGoogleAuth
): Promise<Response> {
	if (!googleAuth) {
		return Promise.reject({
			code: 0,
			message: "cannot find google auth data",
		});
	}

	const result = await fetch(url, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			Authorization: `${googleAuth.token_type} ${googleAuth.access_token}`,
		},
	});

	if (!result.ok) {
		return Promise.reject({ code: result.status, detail: result.json() });
	}

	return result.json();
}

export const youtubeMusicApi = {
	get: getApi,
	put: putApi,
	delete: deleteApi,
};
