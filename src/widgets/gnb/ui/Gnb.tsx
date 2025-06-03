"use client";

import React, { ReactElement } from "react";

import Link from "next/link";

import classNames from "classnames";
import styled from "styled-components";

import YoutubeIcon from "@/shared/ui-toolkit/YoutubeIcon";

export interface GnbProps {
	className?: string;
	accessTokenUrl: string;
	redirectUrl?: string;
}

export default function Gnb(props: GnbProps): ReactElement {
	return (
		<StyledGnbDiv className={classNames("gnb", props.className)}>
			<Link href="/" className={classNames("gnb-title")}>
				<YoutubeIcon className={classNames("gnb-logo")} />
				<h1 className={classNames("page-title")}>Youtube Music 오거나이저</h1>
			</Link>
			<div className={classNames("gnb-btn-container")}></div>
		</StyledGnbDiv>
	);
}

const StyledGnbDiv = styled.div`
	&.gnb {
		height: 50px;
		display: flex;
		align-items: center;

		color: var(--background);
		font-weight: 800;
		font-size: 1.6rem;

		background-color: var(--foreground);
		box-shadow: rgba(14, 63, 126, 0.06) 0px 0px 0px 1px,
			rgba(42, 51, 70, 0.03) 0px 1px 1px -0.5px,
			rgba(42, 51, 70, 0.04) 0px 2px 2px -1px,
			rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px,
			rgba(42, 51, 70, 0.03) 0px 5px 5px -2.5px,
			rgba(42, 51, 70, 0.03) 0px 10px 10px -5px,
			rgba(42, 51, 70, 0.03) 0px 24px 24px -8px;

		.gnb-title {
			height: 100%;

			display: flex;
			align-items: center;

			overflow: hidden;

			.gnb-logo {
				min-width: 34px;
				width: 34px;
				aspect-ratio: 1/1;

				margin: 0 0.8rem;
			}

			.page-title {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}

		.gnb-btn-container {
			margin-left: auto;
		}
	}
`;
