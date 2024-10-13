"use client";

import React, { MouseEventHandler, ReactNode } from "react";

import classNames from "classnames";
import styled from "styled-components";

import { useMusic } from "@/entities/music/models/music";

import { YoutubeThumbnails } from "@/shared/models/youtube-thumbnail";
import Thumbnail from "@/shared/ui-toolkit/Thumbnail";

export interface YoutubeMusicProps {
	className?: string;
	data: {
		videoId: string;
		videoOwnerChannelTitle: string;
		title: string;
		description: string;
		thumbnails: YoutubeThumbnails;
	};
	onClick?: MouseEventHandler<HTMLDivElement>;
	children?: ReactNode;
}

export default function YoutubeMusic(
	props: YoutubeMusicProps
): React.ReactElement {
	const { title, artist } = useMusic({
		videoId: props.data.videoId,
		videoOwnerChannelTitle: props.data.videoOwnerChannelTitle,
		title: props.data.title,
		description: props.data.description,
	});

	return (
		<StyledPlaylistItemCard
			className={classNames("playlist-item", props.className)}
			onClick={props.onClick}
		>
			<div className={classNames("playlist-item-thumbnail-container")}>
				<Thumbnail
					className={classNames("playlist-item-thumbnail")}
					thumbnails={props.data.thumbnails}
					alt={title}
				/>
			</div>
			<div className={classNames("contents")}>
				<h3 className={classNames("title")}>{title}</h3>
				<div className={classNames("description")}>
					<span>{artist}</span>
				</div>
			</div>
			{props.children}
		</StyledPlaylistItemCard>
	);
}

const StyledPlaylistItemCard = styled.div`
	&.playlist-item {
		display: flex;

		.playlist-item-thumbnail-container {
			min-width: 120px;
			width: 120px;

			display: flex;
			justify-content: center;
			align-items: center;

			.playlist-item-thumbnail {
				img {
				}
			}
		}

		.contents {
			padding: 0.5rem;

			overflow: hidden;

			.title {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.description {
				padding: 0.2rem 0;
				font-size: 0.8rem;

				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;

				span {
				}
			}
		}
	}
`;
