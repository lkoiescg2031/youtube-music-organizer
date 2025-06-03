import { useAtomValue, useSetAtom } from "jotai";
import { FunctionComponent, useCallback } from "react";


import {
	mountOverlayElementState,
	overlayElementsState,
	unmountOverlayElementState,
} from "./OverlayProvider";
import "../../../libs/with-resolvers-polyfill";

export interface IOverlay<Value, Error = unknown> {
	overlayId: number;
	resolve: (value: Value) => void;
	reject: (error: Error) => void;
}

export function useOverlay() {
	const overlayElements = useAtomValue(overlayElementsState);

	const mountOverlay = useSetAtom(mountOverlayElementState);
	const unmountOverlay = useSetAtom(unmountOverlayElementState);

	/**
	 * Modal Element와 Toast Element를 구분하지 않고 파라메터로 받아 올바르게 표기한다.
	 * @param element
	 * @returns
	 */
	const overlay = useCallback(
		async <Value, Error = unknown>(
			OverLayComponent: FunctionComponent<IOverlay<Value, Error>>
		): Promise<Value> => {
			const { promise, resolve, reject } = Promise.withResolvers<Value>();

			const overlayId = overlayElements.length;

			const overlayResolve = (value: Value): void => {
				unmountOverlay(overlayId);
				resolve(value);
			};

			const overlayReject = (error: unknown): void => {
				unmountOverlay(overlayId);
				reject(error);
			};

			mountOverlay(
				<OverLayComponent
					overlayId={overlayId}
					resolve={overlayResolve}
					reject={overlayReject}
				/>
			);

			return await promise;
		},
		[overlayElements.length, mountOverlay, unmountOverlay]
	);

	return overlay;
}
