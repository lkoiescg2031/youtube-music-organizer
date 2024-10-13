"use client";

import React, { ReactNode, useId } from "react";

import Image from "next/image";

import classNames from "classnames";
import styled from "styled-components";

import { YoutubeThumbnails } from "@/shared/models/youtube-thumbnail";

export interface ThumbnailProps {
	className?: string;
	id?: string;
	thumbnails: YoutubeThumbnails;
	alt: string;
	children?: ReactNode;
}

export default function Thumbnail(props: ThumbnailProps): React.ReactElement {
	const id = useId();

	return (
		<StyledPicture
			id={props.id}
			className={classNames("thumbnail", props.className)}
		>
			{Object.entries(props.thumbnails)
				.sort((a, b) => b[1].width - a[1].width)
				.map(([key, thumbnail]) => (
					<source
						key={`${id}-${key}`}
						srcSet={thumbnail.url}
						media={`(min-width: ${thumbnail.width}px)`}
					/>
				))}
			{props.thumbnails.default && (
				<Image
					src={props.thumbnails.default.url}
					width={props.thumbnails.default.width}
					height={props.thumbnails.default.height}
					style={{
						width: "100%",
						height: "unset",
					}}
					unoptimized
					alt={props.alt}
				/>
			)}
		</StyledPicture>
	);
}

const StyledPicture = styled.picture`
	&.thumbnail {
		img {
			width: 100%;

			object-fit: covers;
			@media screen and (min-width: 1280px) {
				aspect-ratio: 16/9;
			}
			@media screen and (min-width: 640px) {
				aspect-ratio: 4/3;
			}
			@media screen and (min-width: 480px) {
				aspect-ratio: 4/3;
			}
			@media screen and (min-width: 320px) {
				aspect-ratio: 16/9;
			}
			@media screen and (min-width: 1200px) {
				aspect-ratio: 4/3;
			}
		}
	}
`;
