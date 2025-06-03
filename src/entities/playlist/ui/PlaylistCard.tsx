import classNames from "classnames";
import React, { MouseEventHandler } from "react";
import Moment from "react-moment";
import styled from "styled-components";

import { YoutubeThumbnails } from "shared/models/youtube-thumbnail";
import Thumbnail from "shared/ui-toolkit/Thumbnail";

const PRIVACY_STATUS_NAME: Record<string, string> = {
	private: "비공개",
	public: "공개",
};

export interface PlaylistCardProps {
	className?: string;
	data: {
		title: string;
		description: string;
		itemCount: number;
		embedHtml: string;
		privacyStatus: string;
		thumbnails: YoutubeThumbnails;
		updatedAt: string;
	};
	onClick?: MouseEventHandler<HTMLDivElement>;
}

export default function PlaylistCard(
	props: PlaylistCardProps
): React.ReactElement {
	return (
		<StyledPlaylistCard
			className={classNames("playlist-card", "shadow-md")}
			onClick={props.onClick}
		>
			<Thumbnail
				className={classNames("playlist-thumbnail")}
				thumbnails={props.data.thumbnails}
				alt={props.data.title}
			/>
			<div className={classNames("contents")}>
				<h3 className={classNames("title")}>{props.data.title}</h3>
				<div className={classNames("summary")}>
					<span>{props.data.itemCount} 개 영상</span>
					<span>
						{PRIVACY_STATUS_NAME[props.data.privacyStatus] ||
							props.data.privacyStatus}
					</span>
					<span>
						<Moment format="YYYY-MM-DD HH:mm:ss">{props.data.updatedAt}</Moment>
					</span>
				</div>
				<div className={classNames("summary")}>{props.data.description}</div>
			</div>
		</StyledPlaylistCard>
	);
}

const StyledPlaylistCard = styled.div`
	&.playlist-card {
		margin: 0.5rem;

		display: flex;
		flex-direction: column;

		cursor: pointer;

		.playlist-thumbnail {
			position: relative;

			img {
				border-radius: 0.5rem;
				aspect-ratio: 16/9;
			}
		}

		.contents {
			padding: 0.5rem;

			.summary {
				font-size: 0.7rem;

				span:not(:last-of-type) {
					&::after {
						content: "·";
						padding: 0.2rem;
					}
				}
			}
		}

		&:hover {
			.playlist-thumbnail {
				&::after {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					border-radius: 0.5rem;

					display: flex;
					justify-content: center;
					align-items: center;

					content: "편집하기";
					color: var(--gray000);
					font-weight: 400;
					font-size: 0.8rem;

					background-color: var(--gray900);
					opacity: 0.8;
				}
			}
			transition: transform 0.5s;
			transform: translateY(-10px);
		}
	}
`;
