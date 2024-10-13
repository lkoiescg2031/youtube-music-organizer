import React from "react";

import classNames from "classnames";
import styled from "styled-components";

export interface LoadingIconProps {
	/* Prop Types */
	className?: string;
	animate?: boolean;
}

export default function LoadingIcon(
	props: LoadingIconProps
): React.ReactElement {
	return (
		<StyledLoadingIcon className={classNames("loading-icon", props.className)}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
				<circle strokeWidth="15" r="15" cx="40" cy="100">
					{props.animate && (
						<animate
							attributeName="opacity"
							calcMode="spline"
							dur="2"
							values="1;0;1;"
							keySplines=".5 0 .5 1;.5 0 .5 1"
							repeatCount="indefinite"
							begin="-.4"
						/>
					)}
				</circle>
				<circle strokeWidth="15" r="15" cx="100" cy="100">
					{props.animate && (
						<animate
							attributeName="opacity"
							calcMode="spline"
							dur="2"
							values="1;0;1;"
							keySplines=".5 0 .5 1;.5 0 .5 1"
							repeatCount="indefinite"
							begin="-.2"
						/>
					)}
				</circle>
				<circle strokeWidth="15" r="15" cx="160" cy="100">
					{props.animate && (
						<animate
							attributeName="opacity"
							calcMode="spline"
							dur="2"
							values="1;0;1;"
							keySplines=".5 0 .5 1;.5 0 .5 1"
							repeatCount="indefinite"
							begin="0"
						/>
					)}
				</circle>
			</svg>
		</StyledLoadingIcon>
	);
}

const StyledLoadingIcon = styled.i`
	&.loading-icon {
		fill: var(--gray900);
		stroke: var(--gray900);
		svg {
			width: 100%;
			height: 100%;
		}
	}
`;
