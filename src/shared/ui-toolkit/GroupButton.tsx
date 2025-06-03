import React, {
	Children,
	cloneElement,
	isValidElement,
	MouseEvent,
	MouseEventHandler,
	ReactElement,
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";

import classNames from "classnames";
import styled from "styled-components";

import { atom, useAtom } from "jotai";

import Button from "./Button";
import DownArrowIcon from "./DownArrowIcon";

const activeDropdownIdState = atom<string>();

interface GroupButtonItemProps {
	id: string;
	className?: string;
	onClick?: MouseEventHandler<unknown>;
	disabled?: boolean;
	children?: ReactNode;
}

function GroupButtonItem(props: GroupButtonItemProps): ReactElement {
	return (
		<StyledGroupButtonItem
			className={classNames("group-button-item", props.className)}
			onClick={props.onClick}
			disabled={props.disabled}
		>
			{props.children}
		</StyledGroupButtonItem>
	);
}

const StyledGroupButtonItem = styled(Button)`
	&.group-button-item {
		border-radius: 0;
		background-color: var(--background);

		&:hover {
			background-color: var(--gray300);
		}

		&:disabled {
			background-color: var(--background);

			&::before {
				content: "✔️";
				margin: 0 0.2rem 0.2rem 0;

				color: transparent;
				text-shadow: 0 0 var(--foreground);
				font-size: 0.5rem;
			}
		}
	}
`;

export interface GroupButtonProps {
	className?: string;
	id: string;
	type?: "button" | "submit";
	color?: "primary" | "secondary" | "tertiary";
	size?: "s" | "m";
	disabled?: boolean;
	defaultId?: string;
	children: ReactElement<GroupButtonItemProps>[];
}

function GroupButton(props: GroupButtonProps): ReactElement {
	const [activeDropdownId, setActiveDropdownId] = useAtom(
		activeDropdownIdState
	);
	const [selectedItemId, setSelectedItemId] = useState<string>((): string => {
		if (props.defaultId) {
			return props.defaultId;
		}

		const targetIds =
			Children.map(props.children, (ele): string | undefined => {
				if (!isValidElement(ele)) {
					return;
				}

				return ele.props.id;
			})?.filter((id) => id) || [];

		return targetIds[0];
	});

	const toggleDropdown: MouseEventHandler<HTMLButtonElement> =
		useCallback((): void => {
			if (activeDropdownId === props.id) {
				setActiveDropdownId(undefined);
				return;
			}

			setActiveDropdownId(props.id);
			return;
		}, [props.id, activeDropdownId, setActiveDropdownId]);

	const selectedElement: ReactNode = useMemo(() => {
		const targetElements =
			Children.map(props.children, (ele) => {
				if (!isValidElement(ele)) {
					return;
				}

				if (ele.props.id !== selectedItemId) {
					return;
				}

				return ele;
			})?.filter((id) => id) || [];

		return cloneElement(targetElements[0], {
			onClick: (e: MouseEvent<HTMLButtonElement>): void => {
				if (targetElements[0].props.onClick) {
					targetElements[0].props.onClick(e);
				}

				if (activeDropdownId === props.id) {
					setActiveDropdownId(undefined);
				}
			},
			className: classNames(
				"selected",
				props.color,
				props.size,
				targetElements[0].props.className
			),
			disabled: props.disabled || targetElements[0].props.disabled,
		});
	}, [
		props.children,
		selectedItemId,
		props.color,
		props.size,
		props.disabled,
		props.id,
		activeDropdownId,
		setActiveDropdownId,
	]);

	const dropdownContents: ReactNode = useMemo(
		() =>
			Children.map(props.children, (ele) =>
				cloneElement(ele, {
					className: classNames(props.size, ele.props.className),
					disabled: selectedItemId === ele.props.id,
					onClick: () => {
						setSelectedItemId(ele.props.id);
						setActiveDropdownId(undefined);
					},
				})
			),
		[
			props.children,
			props.size,
			setSelectedItemId,
			setActiveDropdownId,
			selectedItemId,
		]
	);

	/**
	 * 외부의 props.disabled가 활성화 되었을 때,
	 * dropdown menu 자동으로 닫기
	 */
	useEffect(() => {
		if (!props.disabled || activeDropdownId !== props.id) {
			return;
		}
		setActiveDropdownId(undefined);
	}, [props.disabled, activeDropdownId, props.id, setActiveDropdownId]);

	return (
		<StyledDropDownButton
			className={classNames("group-button-container", props.className)}
		>
			<div className={classNames("button-content")}>
				{selectedElement}
				<button
					className={classNames(
						"dropdown-indicator",
						{
							active: activeDropdownId === props.id,
						},
						props.color,
						props.size
					)}
					disabled={props.disabled}
					onClick={toggleDropdown}
				>
					<DownArrowIcon className={classNames("indicator-icon")} />
				</button>
			</div>
			{activeDropdownId === props.id && (
				<div className={classNames("dropdown-content")}>{dropdownContents}</div>
			)}
		</StyledDropDownButton>
	);
}

const StyledDropDownButton = styled.div`
	&.group-button-container {
		position: relative;
		display: inline-block;

		.button-content {
			display: flex;

			.group-button-item.selected {
				padding: 0.3rem 0.8rem;

				border-radius: 0.4rem 0 0 0.4rem;

				background-color: var(--gray100);

				&.primary {
					color: var(--gray000);
					background-color: var(--primary);
				}

				&.secondary {
					color: var(--gray000);
					background-color: var(--secondary);
				}

				&.tertiary {
					color: var(--gray000);
					background-color: var(--tertiary);
				}

				&.s {
					font-size: 0.8rem;
				}

				&:hover {
					background-color: var(--gray300);
				}

				&::before {
					display: none;
				}

				&:disabled {
					color: var(--foreground);
					background-color: var(--background);
				}
			}

			.dropdown-indicator {
				display: flex;
				align-items: center;

				border-radius: 0 0.4rem 0.4rem 0;
				background-color: var(--gray200);

				&::before {
					content: "";
					width: 1px;
					height: 100%;
					display: block;
					background-color: var(--background);
				}

				&:disabled {
					display: none;
				}

				.indicator-icon {
					width: 1rem;
					margin: 0.5rem;
					transition: all 0.1s;
				}

				&.s {
					.indicator-icon {
						width: 0.8rem;
						margin: 0.3rem;
					}
				}

				&.primary {
					fill: var(--gray000);
					background-color: var(--primary-background);
				}

				&.secondary {
					fill: var(--gray000);
					background-color: var(--secondary-background);
				}

				&.tertiary {
					fill: var(--gray000);
					background-color: var(--tertiary-background);
				}

				&:hover {
					background-color: var(--gray300);
				}

				&.active {
					fill: var(--foreground);
					background-color: var(--gray200);
					cursor: default;

					.indicator-icon {
						transform: rotate(180deg);
					}
				}
			}
		}

		.dropdown-content {
			position: absolute;
			right: 0;
			width: max-content;
			padding: 0.4rem 0;
			margin: 0.4rem 0 0 0;
			display: flex;
			flex-direction: column;
			gap: 0.2rem;

			z-index: var(--dropdown-index-level);

			border-radius: 0.4rem;
			background-color: var(--background);
			box-shadow: var(--dropdown-box-shadow);

			.group-button-item {
				&.s {
					padding: 0.2rem 0.7rem;
				}
			}
		}
	}
`;

interface IGroupButtonComponents {
	Item: typeof GroupButtonItem;
}

Object.assign(GroupButton, { Item: GroupButtonItem });

export default GroupButton as unknown as typeof GroupButton &
	IGroupButtonComponents;
