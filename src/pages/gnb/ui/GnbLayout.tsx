"use client";

import classNames from "classnames";
import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";

import { Gnb } from "widgets/gnb";

export interface GnbLayoutProps {
	children?: ReactNode;
}

export default function GnbLayout(props: GnbLayoutProps): ReactElement {
	return (
		<StyledDefaultGnbLayout className={classNames("default-gnb-layout")}>
			<Gnb />
			{props.children}
		</StyledDefaultGnbLayout>
	);
}

const StyledDefaultGnbLayout = styled.div`
	&.default-gnb-layout {
		width: 100vw;
	}
`;
