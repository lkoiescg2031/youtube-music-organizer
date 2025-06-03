import classNames from "classnames";
import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";

export interface CardViewBoxProps extends StyledCardViewBoxProps {
	className?: string;
	children?: ReactNode;
}

export default function CardViewBox(props: CardViewBoxProps): ReactElement {
	return (
		<StyledCardBox
			className={classNames("card-view-box", props.className)}
			cols={props.cols}
		>
			{props.children}
		</StyledCardBox>
	);
}

interface StyledCardViewBoxProps {
	gap?: string;
	cols?: number | Record<number, number>;
}

const StyledCardBox = styled.div<StyledCardViewBoxProps>`
	&.card-view-box {
		width: 100%;

		display: flex;
		flex-wrap: wrap;
		gap: ${(props) => props.gap};

		& > * {
			${(props) => getItemWidthStyle(props)}
		}
	}
`;

function getItemWidthStyle(props: StyledCardViewBoxProps): string {
	if (typeof props.cols === "number") {
		return `width: ${100 / props.cols}%;`;
	}

	if (typeof props.cols === "object") {
		const result = Object.entries(props.cols)
			.sort((a, b) => Number(a[0]) - Number(b[0]))
			.map(([width, value]) => {
				return `
					@media screen and (min-width: ${width}px) {
						width: ${100 / value}%; 
					}
				`;
			})
			.join("");

		return result;
	}

	return "";
}
