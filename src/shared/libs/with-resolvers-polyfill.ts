if (typeof Promise.withResolvers === "undefined") {
	Promise.withResolvers = function withResolvers<T>(): PromiseWithResolvers<T> {
		let resolve: (value: T | PromiseLike<T>) => void = () => {
			throw new Error("resolve is undefined");
		};
		let reject: (error: unknown) => void = () => {
			throw new Error("reject is undefined");
		};

		const promise = new this<T>(function (_resolve, _reject) {
			resolve = _resolve;
			reject = _reject;
		});

		return { resolve, reject, promise };
	};
}
