"use client";

import React, { MouseEventHandler, ReactNode, useCallback } from "react";
import { createPortal } from "react-dom";

import classNames from "classnames";
import styled from "styled-components";

import Button from "./Button";
import CloseIcon from "./CloseIcon";

export interface ModalProps {
	className?: string;
	open?: boolean;
	onClose?: MouseEventHandler;
	children?: ReactNode;
}

export default function Modal(props: ModalProps): React.ReactElement {
	const modalClose: MouseEventHandler<HTMLDialogElement | HTMLButtonElement> =
		useCallback(
			(e): void => {
				const modalTagClicked = e.target === e.currentTarget;

				if (!modalTagClicked) {
					return;
				}

				props.onClose?.(e);
			},
			[props]
		);

	return (
		<>
			{createPortal(
				<StyledModal
					className={classNames("modal-backdrop", props.className)}
					open={props.open}
					onClick={modalClose}
				>
					<div className={classNames("modal")}>
						<div className={classNames("modal-contents")}>{props.children}</div>
						<Button
							className={classNames("modal-close-btn")}
							onClick={props.onClose}
						>
							<CloseIcon className={classNames("close-icon")} />
						</Button>
					</div>
				</StyledModal>,
				document.body
			)}
		</>
	);
}

const StyledModal = styled.dialog`
	&.modal-backdrop[open] {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		// 가끔 아래에
		height: 200vh;
		overflow: hidden;

		display: flex;
		align-items: center;
		justify-content: center;

		background-color: #00000099;
		backdrop-filter: blur(0.5rem);
		z-index: 2;

		.modal {
			position: relative;
			padding: 2rem;

			border-radius: 0.5rem;
			background-color: #fff;

			.modal-close-btn {
				position: absolute;
				top: 0;
				right: 0;
				padding: 0.5rem;
				margin: 0.2rem;

				background-color: transparent;
				.close-icon {
					width: 1.5rem;
					height: 1.5rem;

					display: block;
				}
			}
		}
	}
`;
