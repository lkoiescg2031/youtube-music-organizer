import { useEffect } from "react";

interface IScrollParams {
	total: number;
	current: number;
}

export function useDocumentScrollEnd(
	callback: (params: IScrollParams) => void
): void {
	/**
	 * scroll end event hook
	 */
	useEffect(() => {
		const scroll = (): void => {
			const total = document.documentElement.scrollHeight;
			const current =
				document.documentElement.clientHeight +
				document.documentElement.scrollTop;

			if (Math.ceil(current) < total) {
				return;
			}

			callback({ total, current });
		};

		window.addEventListener("scroll", scroll);
		return () => {
			window.removeEventListener("scroll", scroll);
		};
	}, [callback]);
}
