import LoginForm from "@/widgets/playlist/ui/LoginForm";

interface LoginPageProps {
	accessTokenUrl: string;
	redirectUrl: string;
}

export default function LoginPage(props: LoginPageProps) {
	return (
		<LoginForm
			accessTokenUrl={props.accessTokenUrl}
			redirectUrl={props.redirectUrl}
		/>
	);
}
