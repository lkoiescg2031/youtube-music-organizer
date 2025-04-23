"use client";

import OverlayProvider from "@/shared/libs/overlay/core/OverlayProvider";
import type { IOverlay } from "@/shared/libs/overlay/core/useOverlay";
import { useOverlay } from "@/shared/libs/overlay/core/useOverlay";

export { useOverlay };
export type { IOverlay };

export default Object.assign(OverlayProvider, {
	useOverlay,
});
