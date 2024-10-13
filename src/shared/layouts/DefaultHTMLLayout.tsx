"use client";

import React, { ReactNode } from "react";

import styled from "styled-components";

export interface DefaultHTMLLayoutProps {
	children?: ReactNode;
}

export default function DefaultHTMLLayout(
	props: DefaultHTMLLayoutProps
): React.ReactElement {
	return (
		<StyledDefaultHTMLLayout lang="ko">
			<body>{props.children}</body>
		</StyledDefaultHTMLLayout>
	);
}

const StyledDefaultHTMLLayout = styled.html`
	body {
		user-select: none;
	}
`;
