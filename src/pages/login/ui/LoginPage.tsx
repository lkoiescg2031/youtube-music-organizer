import { ReactNode } from "react";

import LoginForm from "@/widgets/login/ui/LoginForm";

interface LoginPageProps {
	accessTokenUrl: string;
	redirectUrl: string;
	children?: ReactNode;
}

export default function LoginPage(props: LoginPageProps) {
	return (
		<LoginForm
			accessTokenUrl={props.accessTokenUrl}
			redirectUrl={props.redirectUrl}
		/>
	);
}
