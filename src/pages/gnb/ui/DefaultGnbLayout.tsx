"use client";

import React, { ReactElement, ReactNode } from "react";

import classNames from "classnames";
import styled from "styled-components";

import Gnb from "@/widgets/gnb/ui/Gnb";

export interface DefaultGnbLayoutProps {
	accessTokenUrl: string;
	redirectUrl: string;
	children?: ReactNode;
}

export default function DefaultGnbLayout(
	props: DefaultGnbLayoutProps
): ReactElement {
	return (
		<StyledDefaultGnbLayout className={classNames("default-gnb-layout")}>
			<Gnb
				accessTokenUrl={props.accessTokenUrl}
				redirectUrl={props.redirectUrl}
			/>
			{props.children}
		</StyledDefaultGnbLayout>
	);
}

const StyledDefaultGnbLayout = styled.div`
	&.default-gnb-layout {
		width: 100vw;
	}
`;
