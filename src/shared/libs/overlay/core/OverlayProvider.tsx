"use client";

import React, { ReactNode, ReactElement } from "react";

import { useAtomValue, atom, Getter, Setter } from "jotai";

export const overlayElementsState = atom<ReactElement[]>([]);

export const mountOverlayElementState = atom<null, [ReactElement], void>(
	null,
	(get: Getter, set: Setter, overlayElement: ReactElement): void => {
		const overlayElements = get(overlayElementsState);

		const newOverlayElement = Array.from(overlayElements);
		newOverlayElement.push(overlayElement);

		set(overlayElementsState, newOverlayElement);
	}
);

export const unmountOverlayElementState = atom<null, [number], void>(
	null,
	(get: Getter, set: Setter, overlayElementIndex: number) => {
		const overlayElements = get(overlayElementsState);

		const newOverlayElement = Array.from(overlayElements);
		newOverlayElement.splice(overlayElementIndex);

		set(overlayElementsState, newOverlayElement);
	}
);

export interface OverlayProviderProps {
	targetElement?: Element;
	children?: ReactNode;
}

export default function OverlayProvider(
	props: OverlayProviderProps
): React.ReactElement {
	const overlayElements = useAtomValue(overlayElementsState);

	return (
		<>
			{props.children}
			{overlayElements}
		</>
	);
}
