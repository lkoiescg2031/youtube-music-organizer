import classNames from "classnames";
import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";

import Button from "shared/ui-toolkit/Button";
import Textbox from "shared/ui-toolkit/Textbox";

export interface ArtistAliasFormProps {
	className?: string;
	children?: ReactNode;
}

export default function ArtistAliasForm(
	props: ArtistAliasFormProps
): ReactElement {
	return (
		<StyledArtistDictionary
			className={classNames("artist-dictionary-form", props.className)}
		>
			<Textbox readonly>기준 아티스트명</Textbox>
			<Textbox autoFocus>아티스트 명</Textbox>
			{props.children}
			<div className={classNames("form-control-bar")}>
				<Button type="reset">초기화</Button>
				<Button type="submit" color="primary">
					저장
				</Button>
			</div>
		</StyledArtistDictionary>
	);
}

const StyledArtistDictionary = styled.form`
	&.artist-dictionary-form {
		display: flex;
		flex-direction: column;
		gap: 4px;

		.form-control-bar {
			display: flex;
			justify-content: end;
			gap: 4px;
		}
	}
`;
