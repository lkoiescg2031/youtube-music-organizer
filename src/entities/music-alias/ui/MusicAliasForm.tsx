import classNames from "classnames";
import React, { FormEventHandler, ReactNode } from "react";
import styled from "styled-components";

import Button from "shared/ui-toolkit/Button";
import Textbox from "shared/ui-toolkit/Textbox";

export interface MusicAliasFormProps {
	className?: string;
	onSubmit?: FormEventHandler;
	children?: ReactNode;
}

export default function MusicAliasForm(
	props: MusicAliasFormProps
): React.ReactElement {
	const changeMusicDic: FormEventHandler = (e) => {
		e.preventDefault();

		if (props.onSubmit) {
			props.onSubmit(e);
		}
	};

	return (
		<StyledMusicDictionaryForm
			className={classNames("music-dictionary-form", props.className)}
			onSubmit={changeMusicDic}
		>
			<Textbox readonly>ID</Textbox>
			<Textbox autoFocus>아티스트</Textbox>
			<Textbox>제목</Textbox>
			{props.children}
			<div className={classNames("form-control-bar")}>
				<Button type="reset">초기화</Button>
				<Button type="submit" color="primary">
					저장
				</Button>
			</div>
		</StyledMusicDictionaryForm>
	);
}

const StyledMusicDictionaryForm = styled.form`
	&.music-dictionary-form {
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
