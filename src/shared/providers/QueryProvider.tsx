"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactElement, ReactNode, useMemo } from "react";


export interface QueryProviderProps {
	children?: ReactNode;
}

export default function QueryProvider(props: QueryProviderProps): ReactElement {
	const queryClient = useMemo(() => new QueryClient(), []);

	return (
		<QueryClientProvider client={queryClient}>
			{props.children}
		</QueryClientProvider>
	);
}
