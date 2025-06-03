const hostUrl = process.env.HOST_URL as string;

const accessTokenUrl = new URL(hostUrl);
accessTokenUrl.pathname = "/access-token";

const redirectUrl = new URL(hostUrl);
redirectUrl.pathname = "/";

const LoginConfig = {
	accessTokenUrl: accessTokenUrl.toString(),
	redirectUrl: redirectUrl.toString(),
};

export default LoginConfig;
