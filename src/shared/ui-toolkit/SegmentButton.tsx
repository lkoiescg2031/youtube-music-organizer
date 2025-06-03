import classNames from "classnames";
import React, {
	MouseEventHandler,
	ReactElement,
	ReactNode,
	useCallback,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import styled from "styled-components";

interface SegmentButtonItemProps {
	className?: string;
	id: string;
	children?: ReactNode;
}

function SegmentButtonItem(props: SegmentButtonItemProps): ReactElement {
	return (
		<StyledSegmentButtonItem
			type="button"
			className={classNames("segment-button-item", props.className)}
			data-segment-button-id={props.id}
		>
			{props.children}
		</StyledSegmentButtonItem>
	);
}

const StyledSegmentButtonItem = styled.button`
	&.segment-button-item {
		padding: 2px 12px;
		z-index: 1;

		font-size: 0.8rem;
		white-space: nowrap;
	}
`;

interface SegmentButtonProps {
	className?: string;
	defaultSelected?: string;
	onSelectedChanged?: (newId: string) => void;
	children?: ReactNode;
}

function SegmentButton(props: SegmentButtonProps): ReactElement {
	const segmentButtonListRef = useRef<HTMLDivElement>(null);
	const segmentBackdropRef = useRef<HTMLDivElement>(null);
	const [selected, setSelected] = useState(props.defaultSelected);

	const updateSelected = useCallback(
		(targetEle: HTMLButtonElement): void => {
			const targetRect = targetEle.getBoundingClientRect();
			const selectedId = targetEle.getAttribute("data-segment-button-id");

			console.log(selectedId);
			if (!selectedId) {
				// is not selected button segment
				return;
			}

			if (!segmentBackdropRef.current) {
				console.error("can not found segment-button backdrop");
				return;
			}

			segmentBackdropRef.current.style.top = `${targetEle.offsetTop}px`;
			segmentBackdropRef.current.style.left = `${targetEle.offsetLeft}px`;
			segmentBackdropRef.current.style.width = `${targetRect.width}px`;
			segmentBackdropRef.current.style.height = `${targetRect.height}px`;

			if (selectedId === selected) {
				return;
			}

			setSelected(selectedId);

			if (props.onSelectedChanged) {
				props.onSelectedChanged(selectedId);
			}
		},
		[selected, props]
	);

	const changeSelected: MouseEventHandler<HTMLDivElement> = (
		e: React.MouseEvent<HTMLDivElement>
	) => {
		e.preventDefault();

		updateSelected(e.target as HTMLButtonElement);
	};

	useLayoutEffect(() => {
		if (!segmentButtonListRef.current) {
			console.error("not found segment button list ele");
			return;
		}

		let activeEle =
			segmentButtonListRef.current.querySelector<HTMLButtonElement>(
				`button[data-segment-button-id="${props.defaultSelected}"]`
			);

		if (!activeEle) {
			activeEle = segmentButtonListRef.current.querySelector<HTMLButtonElement>(
				`button[data-segment-button-id]`
			);
		}

		if (!activeEle) {
			return;
		}

		updateSelected(activeEle);
		// only active component mount
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<StyledSegmentButton
			className={classNames("segment-button", props.className)}
			onClick={changeSelected}
			selectedId={selected}
		>
			<div
				ref={segmentButtonListRef}
				className={classNames("segment-button-list")}
			>
				<div
					ref={segmentBackdropRef}
					className={classNames("segment-backdrop")}
				/>
				{props.children}
			</div>
		</StyledSegmentButton>
	);
}

interface StyledSegmentButtonProps {
	selectedId?: string;
}

const StyledSegmentButton = styled.div<StyledSegmentButtonProps>`
	&.segment-button {
		width: min-content;
		padding: 4px 7px;

		border-radius: 5px;
		background-color: #eaeaea;

		.segment-button-list {
			position: relative;

			display: flex;
			flex-direction: row;
			gap: 10px;

			.segment-backdrop {
				position: absolute;
				top: 0;
				left: 0;

				border-radius: 8px;
				background-color: #fff;
				box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
					rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

				transition: all 0.5s ease-in-out;
			}

			.segment-button-item {
				opacity: 0.3;
				transition: all 0.5s ease-in-out;

				&:hover {
					opacity: 0.7;
				}

				&[data-segment-button-id="${(props) => props.selectedId}"] {
					opacity: 1;

					cursor: default;
				}
			}
		}
	}
`;

interface ISegmentButtonComponents {
	Item: typeof SegmentButtonItem;
}

Object.assign(SegmentButton, { Item: SegmentButtonItem });

export default SegmentButton as unknown as typeof SegmentButton &
	ISegmentButtonComponents;
