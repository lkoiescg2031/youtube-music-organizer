"use client";

import classNames from "classnames";
import React, { ReactNode, useId } from "react";
import styled from "styled-components";

export interface TextboxProps {
	className?: string;
	autoFocus?: boolean;
	readonly?: boolean;
	placeholder?: string;
	children?: ReactNode;
}

export default function Textbox(props: TextboxProps): React.ReactElement {
	const textboxId = useId();
	return (
		<StyledTextbox
			className={classNames(
				"text-box",
				{ readonly: props.readonly },
				props.className
			)}
			tabIndex={props.readonly ? -1 : undefined}
		>
			<label className={classNames("label")} htmlFor={textboxId}>
				{props.children}
			</label>
			<input
				className={classNames("input")}
				id={textboxId}
				readOnly={props.readonly}
				placeholder={props.placeholder}
				autoFocus={props.autoFocus}
			/>
			<div className={classNames("underline")} />
		</StyledTextbox>
	);
}

const StyledTextbox = styled.div`
	&.text-box {
		padding: 2px 6px;

		display: flex;
		flex-direction: column;

		.label {
			padding: 0 0 0 10px;
			font-size: 0.8rem;
		}

		.input {
			flex: 1;
			padding: 2px 8px;

			&:focus-visible {
				outline: none;
			}

			&:read-only {
				border: none;
			}
		}

		.underline {
			align-self: center;

			width: 0px;
			height: 1px;

			background-color: #000;
			transition: width 0.1s ease-in-out;
		}

		&.readonly {
			.underline {
				display: none;
			}
		}

		&:focus-within {
			.underline {
				width: 100%;
			}
		}
	}
`;
