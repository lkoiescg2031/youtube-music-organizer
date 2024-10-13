import React from "react";

import classNames from "classnames";
import styled from "styled-components";

export interface DownArrowIconProps {
	className?: string;
}

export default function DownArrowIcon(
	props: DownArrowIconProps
): React.ReactElement {
	return (
		<StyledDownArrowIcon
			className={classNames("down-arrow-icon", props.className)}
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<path d="M11.1808 15.8297L6.54199 9.20285C5.89247 8.27496 6.55629 7 7.68892 7L16.3111 7C17.4437 7 18.1075 8.27496 17.458 9.20285L12.8192 15.8297C12.4211 16.3984 11.5789 16.3984 11.1808 15.8297Z" />
			</svg>
		</StyledDownArrowIcon>
	);
}

const StyledDownArrowIcon = styled.i`
	&.down-arrow-icon {
		svg {
			width: 100%;
			height: 100%;
		}
	}
`;
