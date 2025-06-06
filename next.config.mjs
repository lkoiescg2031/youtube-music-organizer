/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.ytimg.com",
			},
		],
	},
	compiler: {
		styledComponents: true,
	},
};

export default nextConfig;
