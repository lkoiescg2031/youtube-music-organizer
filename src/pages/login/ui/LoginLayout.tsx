"use client";

import React, { ReactNode } from "react";

import { useAtomValue } from "jotai";

import LoginForm from "@/widgets/login/ui/LoginForm";

import { googleAuthState, isLogin } from "@/shared/models/youtube-login";

export interface LoginLayoutProps {
	accessTokenUrl: string;
	redirectUrl: string;
	children?: ReactNode;
}

export default function LoginLayout(
	props: LoginLayoutProps
): React.ReactElement {
	const googleAuth = useAtomValue(googleAuthState);

	if (!isLogin(googleAuth)) {
		return (
			<LoginForm
				accessTokenUrl={props.accessTokenUrl}
				redirectUrl={props.redirectUrl}
			/>
		);
	}

	return <>{props.children}</>;
}
