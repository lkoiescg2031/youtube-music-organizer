"use client";

import React from "react";

import classNames from "classnames";
import styled from "styled-components";

import { GoogleLoginBtn } from "@/features/google-auth";

export interface LoginFormProps {
	className?: string;
	accessTokenUrl: string;
	redirectUrl?: string;
}

export default function LoginForm(props: LoginFormProps): React.ReactElement {
	return (
		<StyledLoginFormDiv className={classNames("login-form", props.className)}>
			<div className={classNames("login-card")}>
				<h2>Youtube 정보를 가져오기</h2>
				<GoogleLoginBtn
					accessTokenUrl={props.accessTokenUrl}
					redirectUrl={props.redirectUrl}
				/>
			</div>
		</StyledLoginFormDiv>
	);
}

const StyledLoginFormDiv = styled.div`
	&.login-form {
		position: fixed;
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.login-card {
			width: 300px;
			aspect-ratio: 1/2;
			margin: 0.8rem;

			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 1.6rem;

			border: 1px var(--gray400) solid;
			border-radius: 0.8rem;
		}
	}
`;
