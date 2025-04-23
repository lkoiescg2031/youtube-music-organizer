"use client";

import React, { MouseEventHandler, useEffect, useMemo, useState } from "react";

import classNames from "classnames";
import styled from "styled-components";

import {
	DragDropContext,
	Droppable,
	Draggable,
	OnDragEndResponder,
} from "react-beautiful-dnd";

import {
	MusicSortDirectionType,
	MusicSortKeyType,
	useMusicSorter,
} from "@/features/sort-playlist-item/libs/useMusicSorter";
import MusicSortForm from "@/features/sort-playlist-item/ui/MusicSortForm";

import { useDeletePlaylistItemMutation } from "@/entities/music/apis/deletePlaylistItem";
import { useInfiniteGetPlaylistItemQuery } from "@/entities/music/apis/getPlaylistItems";
import { usePutPlaylistItemPositionMutation } from "@/entities/music/apis/putPlaylistItem";
import { INativePlaylistItem } from "@/entities/music/models/native-playlist-item";
import YoutubeMusic from "@/entities/music/ui/YoutubeMusic";
import { useInfiniteGetMyPlaylistQuery } from "@/entities/playlist/apis/playlist";

import { IOverlay, useOverlay } from "@/shared/libs/overlay";
import { useDocumentScrollEnd } from "@/shared/libs/useDocumentScrollEnd";
import Button from "@/shared/ui-toolkit/Button";
import GroupButton from "@/shared/ui-toolkit/GroupButton";
import LoadingIcon from "@/shared/ui-toolkit/LoadingIcon";
import Modal from "@/shared/ui-toolkit/Modal";

interface IOrderablePlaylistItem extends INativePlaylistItem {
	selected?: boolean;
	deleted?: boolean;
}

export interface MusicListProps {
	className?: string;
	playlistId: string;
}

export default function MusicList(props: MusicListProps): React.ReactElement {
	const overlay = useOverlay();

	const playlistQuery = useInfiniteGetMyPlaylistQuery();

	const [isSaving, setIsSaving] = useState(false);
	const [saveProcessedCount, setSaveProcessedCount] = useState(0);
	const [saveTotalCount, setSaveTotalCount] = useState(0);
	const getPlaylistItemQuery = useInfiniteGetPlaylistItemQuery({
		playlistId: props.playlistId,
	});
	const deletePlaylistIteMutation = useDeletePlaylistItemMutation();
	const putPlaylistItemMutation = usePutPlaylistItemPositionMutation();

	const [reorderedItem, setReorderedItem] = useState<IOrderablePlaylistItem[]>(
		() =>
			getPlaylistItemQuery.data?.pages.map((page) => page.items).flat() || []
	);
	const visibleReorderItem = useMemo(
		() => reorderedItem.filter((item) => !item.deleted),
		[reorderedItem]
	);

	const sortMusic = useMusicSorter<IOrderablePlaylistItem>();
	const sortReorderItem =
		(
			sortKey: MusicSortKeyType,
			dir: MusicSortDirectionType
		): MouseEventHandler<HTMLButtonElement> =>
		() => {
			const newOrderItem = Array.from(reorderedItem);

			sortMusic(newOrderItem, { sortKey, dir });

			setReorderedItem(newOrderItem);
		};

	const resetReorderedItem = (): void => {
		getPlaylistItemQuery.resetQuery();
		setReorderedItem([]);
	};

	const handleDragEnd: OnDragEndResponder = (result) => {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		const items = Array.from(reorderedItem);

		const source = visibleReorderItem[result.source.index];
		const sourceIdx = items.findIndex((item) => item.id === source.id);

		const destination = visibleReorderItem[result.destination.index];
		const destinationIdx = items.findIndex(
			(item) => item.id === destination.id
		);

		const [removed] = items.splice(sourceIdx, 1);
		items.splice(destinationIdx, 0, removed);

		setReorderedItem(items);
	};

	const deleteItem: (itemId: string) => MouseEventHandler<HTMLButtonElement> =
		(itemId: string) => () => {
			const items = Array.from(reorderedItem);
			const targetIdx = items.findIndex((item) => item.id === itemId);
			const [removed] = items.splice(targetIdx, 1);
			const updatedItem: IOrderablePlaylistItem = JSON.parse(
				JSON.stringify(removed)
			);
			updatedItem.deleted = true;

			items.splice(targetIdx, 0, updatedItem);

			setReorderedItem(items);
		};

	const modifyItem: (itemId: string) => MouseEventHandler<HTMLButtonElement> =
		(_itemId: string) => () => {
			// TODO overlay의 resolve, reject 연결
			overlay((props: IOverlay<void>) => (
				<Modal open onClose={() => props.resolve()}>
					<MusicSortForm />
				</Modal>
			));
		};

	const save: MouseEventHandler<
		HTMLButtonElement
	> = async (): Promise<void> => {
		try {
			const reorderTargets = reorderedItem.filter((item) => !item.deleted);
			const deleteTargets = reorderedItem.filter((item) => item.deleted);

			setIsSaving(true);
			setSaveTotalCount(reorderTargets.length + deleteTargets.length);
			setSaveProcessedCount(0);

			for (const idx in reorderTargets) {
				const item = reorderTargets[idx];
				const newPosition = Number(idx);

				if (newPosition !== item.snippet.position) {
					await putPlaylistItemMutation.mutateAsync({ item, newPosition });
				}

				setSaveProcessedCount((prev) => prev + 1);
			}

			for (const idx in deleteTargets) {
				const itemId = deleteTargets[idx].id;

				await deletePlaylistIteMutation.mutateAsync(itemId);

				setSaveProcessedCount((prev) => prev + 1);
			}

			resetReorderedItem();
			setIsSaving(false);
		} catch (e) {
			alert("저장 실패" + JSON.stringify(e));
			setIsSaving(false);
		}
	};

	const totalResults =
		getPlaylistItemQuery.data?.pages[
			getPlaylistItemQuery.data?.pages.length - 1
		].pageInfo.totalResults;
	const playlistTitle = useMemo(
		() =>
			playlistQuery.data?.pages
				.map((page) => page.items)
				.flat()
				.filter((item) => item.id === props.playlistId)[0].snippet.title,
		[playlistQuery.data, props.playlistId]
	);

	useDocumentScrollEnd(() => {
		if (getPlaylistItemQuery.isFetching) {
			return;
		}

		getPlaylistItemQuery.fetchNextPage();
	});

	/**
	 * 새 페이지가 추가되는 경우, reorderedItem 과 동기화
	 */
	useEffect(() => {
		if (!getPlaylistItemQuery.data) {
			return;
		}

		const lastPageIndex = Math.max(
			0,
			getPlaylistItemQuery.data.pages.length - 1
		);

		const unique = new Set<string>(reorderedItem.map((item) => item.id));
		const appendedPlaylistItem = getPlaylistItemQuery.data.pages[
			lastPageIndex
		].items.filter((item) => !unique.has(item.id));

		setReorderedItem([...reorderedItem, ...appendedPlaylistItem]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getPlaylistItemQuery.data?.pages.length || -1]);

	return (
		<StyledMusicList className={classNames("music-list", props.className)}>
			<h2 className={classNames("title")}>{playlistTitle}</h2>
			<div className={classNames("control-bar")}>
				<GroupButton
					id="save-dropdown"
					className={classNames("save-btn")}
					size="s"
					color="primary"
					disabled={isSaving}
				>
					<GroupButton.Item id="save" onClick={save} disabled={isSaving}>
						저장
						{isSaving && (
							<>
								<span>
									중 ({saveProcessedCount}/{saveTotalCount})
								</span>
								<LoadingIcon animate />
							</>
						)}
					</GroupButton.Item>
					<GroupButton.Item id="save-as-other">
						다른 플레이리스트로 저장
					</GroupButton.Item>
				</GroupButton>
				{!isSaving && (
					<>
						<Button
							size="s"
							onClick={resetReorderedItem}
							disabled={getPlaylistItemQuery.isFetching}
						>
							변경 취소
							{getPlaylistItemQuery.isFetching && <LoadingIcon animate />}
						</Button>
						<GroupButton
							id="sort-dropdown"
							className={classNames("sort-btn")}
							size="s"
						>
							<GroupButton.Item
								id="asc-artist"
								onClick={sortReorderItem("artist", "asc")}
							>
								아티스트 오름차순 정렬
							</GroupButton.Item>
							<GroupButton.Item
								id="desc-artist"
								onClick={sortReorderItem("artist", "desc")}
							>
								아티스트 내림차순 정렬
							</GroupButton.Item>
							<GroupButton.Item
								id="asc-title"
								onClick={sortReorderItem("title", "asc")}
							>
								제목 오름차순 정렬
							</GroupButton.Item>
							<GroupButton.Item
								id="desc-title"
								onClick={sortReorderItem("title", "desc")}
							>
								제목 내림차순 정렬
							</GroupButton.Item>
							<GroupButton.Item
								id="asc-origin"
								onClick={sortReorderItem("origin", "asc")}
							>
								원본 오름차순 정렬
							</GroupButton.Item>
							<GroupButton.Item
								id="desc-origin"
								onClick={sortReorderItem("origin", "desc")}
							>
								원본 내림차순 정렬
							</GroupButton.Item>
						</GroupButton>
						{getPlaylistItemQuery.hasNextPage && (
							<GroupButton
								id="load-dropdown"
								className={classNames("save-btn")}
								size="s"
								disabled={getPlaylistItemQuery.isFetching}
							>
								<GroupButton.Item
									id="load-more"
									className={classNames("more-btn")}
									onClick={() => getPlaylistItemQuery.fetchNextPage()}
									disabled={getPlaylistItemQuery.isFetching}
								>
									더 보기
									{getPlaylistItemQuery.isFetching && <LoadingIcon animate />}
								</GroupButton.Item>
								<GroupButton.Item
									id="load-all"
									className={classNames("load-all-btn")}
									onClick={() => getPlaylistItemQuery.fetchAllNextPage()}
									disabled={getPlaylistItemQuery.isFetching}
								>
									모두 불러오기
									{getPlaylistItemQuery.isFetching && <LoadingIcon animate />}
								</GroupButton.Item>
							</GroupButton>
						)}
					</>
				)}
			</div>
			<div className={classNames("item-count")}>
				{typeof totalResults !== "undefined" ? (
					<span>
						{reorderedItem.filter((item) => !item.deleted).length} /{" "}
						{totalResults} 개의 컨텐츠
					</span>
				) : (
					<LoadingIcon className={classNames("item-count-loading")} animate />
				)}
			</div>
			<DragDropContext onDragEnd={handleDragEnd}>
				<Droppable droppableId="droppabble">
					{(provided, _snapshot) => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							className={classNames("music-list-box")}
						>
							{visibleReorderItem?.map((item, index) => (
								<Draggable
									key={item.id}
									draggableId={item.id}
									index={index}
									isDragDisabled={isSaving}
								>
									{(provided, _snapshot) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											className={classNames("music-list-item-container", {
												disabled: isSaving,
											})}
										>
											<div className={classNames("index")}>{index + 1}</div>
											<YoutubeMusic
												key={item.id}
												className={classNames("music-list-item")}
												data={{
													videoId: item.snippet.resourceId.videoId,
													title: item.snippet.title,
													videoOwnerChannelTitle:
														item.snippet.videoOwnerChannelTitle || "",
													description: item.snippet.description,
													thumbnails: item.snippet.thumbnails,
												}}
											/>
											<div className={classNames("music-list-item-control")}>
												<Button onClick={modifyItem(item.id)}>수정</Button>
												<Button color="danger" onClick={deleteItem(item.id)}>
													삭제
												</Button>
											</div>
										</div>
									)}
								</Draggable>
							))}
						</div>
					)}
				</Droppable>
			</DragDropContext>
			{getPlaylistItemQuery.isFetching && (
				<LoadingIcon className={classNames("more-loading")} animate />
			)}
		</StyledMusicList>
	);
}

const StyledMusicList = styled.div`
	&.music-list {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;

		padding: 0.8rem;

		& > .title {
			position: absolute;
			top: 0.8rem;
			left: 0.8rem;
			margin: 1rem;

			font-size: 2rem;
			font-weight: 700;
		}

		.control-bar {
			position: sticky;
			top: 0;
			width: 100%;
			padding: 0.5rem;

			display: flex;
			flex-flow: row-reverse wrap-reverse;
			gap: 0.2rem;
			z-index: 1;

			.button {
				display: flex;
				align-items: center;
				gap: 0.2rem;

				.loading-icon {
					height: 1.2rem;
				}

				&.primary {
					.loading-icon {
						fill: var(--gray000);
						stroke: var(--gray000);
					}
				}

				&:disabled {
					.loading-icon {
						fill: var(--foreground);
						stroke: var(--foreground);
					}
				}
			}
		}

		.item-count {
			width: 100%;
			padding: 0 0.9rem;
			margin: 0.8rem;
			display: flex;
			flex-direction: row-reverse;

			text-align: end;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;

			.item-count-loading {
				height: 1.2rem;
			}
		}

		.music-list-box {
			width: 100%;

			display: flex;
			flex-direction: column;
			gap: 0.2rem;

			.music-list-item-container {
				/* max-height: 4rem; */
				margin: 0.1rem 0;
				display: flex;
				align-items: center;

				cursor: pointer;

				--index-width: 2rem;
				--index-x-padding: 0.2rem;

				.index {
					min-width: var(--index-width);
					max-width: var(--index-width);
					margin: var(--index-x-padding) 0.7rem var(--index-x-padding) 0;

					text-align: end;
				}

				--index-space: calc(var(--index-width) + var(--index-x-padding) * 2);

				.music-list-item {
					min-width: calc(100% - var(--index-space));
					max-width: calc(100% - var(--index-space));
				}

				--control-item-width: 4rem;
				--control-item-count: 2;

				.music-list-item-control {
					align-self: stretch;
					display: none;

					border-radius: 0 0.2rem 0.2rem 0;

					.button {
						width: var(--control-item-width);
						height: 100%;
						border-radius: 0;

						&:last-of-type {
							border-radius: 0 0.2rem 0.2rem 0;
						}
					}
				}

				&:hover {
					position: relative;

					background-color: var(--gray200);
					border-radius: 0.2rem;

					.music-list-item {
						min-width: calc(
							100% - var(--index-space) - var(--control-item-width) *
								var(--control-item-count)
						);
						max-width: calc(
							100% - var(--index-space) - var(--control-item-width) *
								var(--control-item-count)
						);
					}

					.music-list-item-control {
						display: flex;
					}
				}

				&.disabled {
					background-color: transparent;

					cursor: default;

					.music-list-item-control {
						display: none;
					}
				}
			}
		}

		.more-loading {
			height: 2rem;
		}
	}
`;
