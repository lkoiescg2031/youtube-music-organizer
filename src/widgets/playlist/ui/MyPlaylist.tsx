"use client";

import React from "react";

import { useRouter } from "next/navigation";

import classNames from "classnames";
import styled from "styled-components";

import {
	PlaylistCard,
	useInfiniteGetMyPlaylistQuery,
} from "@/entities/playlist";

import Button from "@/shared/ui-toolkit/Button";
import CardViewBox from "@/shared/ui-toolkit/CardViewBox";

export interface MyPlaylistProps {
	className?: string;
}

export default function MyPlaylist(props: MyPlaylistProps): React.ReactElement {
	const router = useRouter();
	const playlistQuery = useInfiniteGetMyPlaylistQuery();

	const playlist = playlistQuery.data?.pages.map((page) => page.items).flat();
	const totalResults =
		playlistQuery.data?.pages[playlistQuery.data?.pages.length - 1].pageInfo
			.totalResults;

	return (
		<StyledMyPlaylist className={classNames("my-playlist", props.className)}>
			<div className={classNames("item-count")}>
				{totalResults} 개의 재생목록 검색 됨
			</div>
			<CardViewBox
				className={classNames("playlist-card-view-box")}
				cols={{
					750: 2,
					1028: 3,
					1500: 4,
					1920: 5,
				}}
			>
				{playlist?.map((item) => (
					<div key={item.id} className={classNames("playlist-card-view-item")}>
						<PlaylistCard
							onClick={(e): void => {
								e.preventDefault();
								e.stopPropagation();

								router.push(`/playlist/${item.id}`);
							}}
							data={{
								title: item.snippet.title,
								description: item.snippet.description,
								itemCount: item.contentDetails.itemCount,
								embedHtml: item.player.embedHtml,
								privacyStatus: item.status.privacyStatus,
								thumbnails: item.snippet.thumbnails,
								updatedAt: item.snippet.publishedAt,
							}}
						/>
					</div>
				))}
			</CardViewBox>
			{playlistQuery.hasNextPage && (
				<Button
					className={classNames("more-btn")}
					onClick={() => playlistQuery.fetchNextPage()}
				>
					다음 페이지 보기
				</Button>
			)}
		</StyledMyPlaylist>
	);
}

const StyledMyPlaylist = styled.div`
	&.my-playlist {
		display: flex;
		flex-direction: column;
		align-items: center;

		padding: 0.8rem;

		.item-count {
			width: 100%;
			text-align: end;
			margin: 0.8rem;
		}

		.playlist-card-view-box {
			max-width: 1920px;

			@media screen and (max-width: 750px) {
				width: 100%;
				align-items: center;
				gap: 1rem;

				.playlist-card-view-item {
					width: 100%;

					.playlist-card {
						margin: 0;
					}
				}
			}
		}
		.more-btn {
		}
	}
`;
