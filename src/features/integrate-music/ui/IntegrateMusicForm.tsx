import classNames from "classnames";
import React, { ReactElement, ReactNode, useState } from "react";
import styled from "styled-components";

import SegmentButton from "shared/ui-toolkit/SegmentButton";

import { ArtistAliasForm } from "entities/artist-alias";
import { INativePlaylistItem } from "entities/music";
import { MusicAliasForm } from "entities/music-alias";

export interface IntegrateMusicFormProps {
	className?: string;
	defaultValues?: INativePlaylistItem;
	children?: ReactNode;
}

export default function IntegrateMusicForm(
	props: IntegrateMusicFormProps
): ReactElement {
	const [activeForm, setActiveForm] = useState("Music");

	// const { musicAlias, artistAlias } = useIntegrateMusic(props.defaultValues);

	return (
		<StyledMusicItemForm
			className={classNames("music-item-form", props.className)}
		>
			<h4 className={classNames("music-form-title")}>음악 수정</h4>
			<div className={classNames("form-menu")}>
				<SegmentButton onSelectedChanged={setActiveForm}>
					<SegmentButton.Item id="Music">음악</SegmentButton.Item>
					<SegmentButton.Item id="Artist">아티스트</SegmentButton.Item>
				</SegmentButton>
			</div>
			{activeForm === "Music" && (
				<MusicAliasForm className={classNames("sort-form", "music")} />
			)}
			{activeForm === "Artist" && (
				<ArtistAliasForm className={classNames("sort-form", "artist")} />
			)}
		</StyledMusicItemForm>
	);
}

const StyledMusicItemForm = styled.section`
	&.music-item-form {
		transition: height 0.5s ease-in-out;

		.music-form-title {
			margin: 0 0 0.5rem;

			font-size: 1.2rem;
		}

		.form-menu {
			display: flex;
			justify-content: end;
		}

		.sort-form {
			padding: 8px 2px;
			width: 300px;
		}
	}
`;
