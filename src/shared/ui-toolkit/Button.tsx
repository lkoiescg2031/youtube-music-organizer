import React, { MouseEventHandler, ReactNode } from "react";

import classNames from "classnames";
import styled from "styled-components";

export interface ButtonProps {
	className?: string;
	type?: "button" | "submit" | "reset";
	color?: "primary" | "secondary" | "tertiary" | "danger";
	size?: "s" | "m";
	pill?: boolean;
	disabled?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	children?: ReactNode;
}

export default function Button(props: ButtonProps): React.ReactElement {
	return (
		<StyledButton
			type={props.type || "button"}
			className={classNames(
				"button",
				{ pill: props.pill },
				props.size,
				props.color,
				props.className
			)}
			onClick={props.onClick}
			disabled={props.disabled}
		>
			{props.children}
		</StyledButton>
	);
}

const StyledButton = styled.button`
	&.button {
		padding: 0.3rem 0.8rem;

		border-radius: 0.4rem;
		background-color: var(--gray100);

		&.pill {
			border-radius: 2rem;
		}

		&.s {
			font-size: 0.8rem;
		}

		&.primary {
			color: var(--gray000);
			background-color: var(--primary);
		}
		&.secondary {
			background-color: var(--secondary);
		}
		&.tertiary {
			background-color: var(--tertiary);
		}

		&.danger {
			color: var(--gray000);
			background-color: var(--danger);
		}

		&:hover {
			background-color: var(--gray300);
		}

		&:disabled {
			color: var(--foreground);
			background-color: var(--background);
		}
	}
`;
