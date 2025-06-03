"use client";

import OverlayProvider from "./core/OverlayProvider";
import type { IOverlay } from "./core/useOverlay";
import { useOverlay } from "./core/useOverlay";

export { useOverlay };
export type { IOverlay };

export default Object.assign(OverlayProvider, {
	useOverlay,
});
