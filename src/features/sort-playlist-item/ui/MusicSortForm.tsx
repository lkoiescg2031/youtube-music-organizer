import React, { ReactNode, useState } from "react";

import classNames from "classnames";
import styled from "styled-components";

import ArtistDictionaryForm from "@/entities/music/ui/ArtistDictionaryForm";
import MusicDictionaryForm from "@/entities/music/ui/MusicDictionaryForm";

import SegmentButton from "@/shared/ui-toolkit/SegmentButton";

interface IMusicTypeSortForm {
	type: "Music";
	id?: string;
	artist?: string;
	title?: string;
}

interface IArtistTypeSortForm {
	type: "Artist";
	artist?: string;
	alias?: string;
}

type MusicSortForm = IMusicTypeSortForm | IArtistTypeSortForm;

export interface MusicSortFormProps {
	className?: string;
	defaultValues?: MusicSortForm;
	children?: ReactNode;
}

export default function MusicSortForm(
	props: MusicSortFormProps
): React.ReactElement {
	const [activeForm, setActiveForm] = useState("ID");

	return (
		<StyledMusicSortForm
			className={classNames("music-sort-form", props.className)}
		>
			<h4 className={classNames("sort-form-title")}>음악 수정</h4>
			<div className={classNames("form-menu")}>
				<SegmentButton onSelectedChanged={setActiveForm}>
					<SegmentButton.Item id="Music">음악</SegmentButton.Item>
					<SegmentButton.Item id="Artist">아티스트</SegmentButton.Item>
				</SegmentButton>
			</div>
			{activeForm === "Music" && (
				<MusicDictionaryForm className={classNames("sort-form", "music")} />
			)}
			{activeForm === "Artist" && (
				<ArtistDictionaryForm className={classNames("sort-form", "artist")} />
			)}
		</StyledMusicSortForm>
	);
}

const StyledMusicSortForm = styled.section`
	&.music-sort-form {
		transition: height 0.5s ease-in-out;

		.sort-form-title {
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
