"use client";

import React from "react";
import styled from "styled-components";

import { useYoutubeSDKConfig } from "shared/libs/useYoutubeSDKConfig";
import GoogleIcon from "shared/ui-toolkit/GoogleIcon";

interface GoogleLoginBtnProps {
	accessTokenUrl: string;
	redirectUrl?: string;
}

export default function GoogleLoginBtn(
	props: GoogleLoginBtnProps
): React.ReactElement {
	const { youtubeClientId } = useYoutubeSDKConfig();

	function oauthSignIn() {
		// Google's OAuth 2.0 endpoint for requesting an access token
		const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

		// Create <form> element to submit parameters to OAuth 2.0 endpoint.
		const form = document.createElement("form");
		form.setAttribute("method", "GET"); // Send as a GET request.
		form.setAttribute("action", oauth2Endpoint);

		// Parameters to pass to OAuth 2.0 endpoint.
		const redirectUrl = new URL(props.accessTokenUrl);
		redirectUrl.searchParams.append(
			"redirectUrl",
			props.redirectUrl || window.location.href
		);

		console.log(redirectUrl.toString());

		const params = {
			client_id: youtubeClientId,
			redirect_uri: redirectUrl.toString(),
			response_type: "token",
			scope: "https://www.googleapis.com/auth/youtube",
			include_granted_scopes: "true",
			state: "pass-through value",
		};

		// Add form parameters as hidden input values.
		Object.entries(params).forEach(([key, value]) => {
			const input = document.createElement("input");
			input.setAttribute("type", "hidden");
			input.setAttribute("name", key);
			input.setAttribute("value", value);
			form.appendChild(input);
		});

		// Add form to page and submit it to open the OAuth 2.0 endpoint.
		document.body.appendChild(form);
		form.submit();
	}

	return (
		<StyledGoogleLoginBtn
			id="container"
			className="haAclf"
			style={{ padding: "6px 10px" }}
			onClick={oauthSignIn}
		>
			<div
				tabIndex={0}
				role="button"
				aria-labelledby="button-label"
				className="nsm7Bb-HzV7m-LgbsSe pSzOP-SxQuSe i5vt6e-Ia7Qfc uaxL4e-RbRzK"
			>
				<div className="nsm7Bb-HzV7m-LgbsSe-MJoBVe"></div>
				<div className="nsm7Bb-HzV7m-LgbsSe-bN97Pc-sM5MNb">
					<div className="nsm7Bb-HzV7m-LgbsSe-Bz112c">
						<GoogleIcon className="LgbsSe-Bz112c" />
					</div>
					<span className="nsm7Bb-HzV7m-LgbsSe-BPrWId">
						Google 계정으로 로그인
					</span>
					<span className="L6cTce" id="button-label">
						Google 계정으로 로그인
					</span>
				</div>
			</div>
		</StyledGoogleLoginBtn>
	);
}

const StyledGoogleLoginBtn = styled.div`
	.qJTHM {
		-webkit-user-select: none;
		color: #202124;
		direction: ltr;
		-webkit-touch-callout: none;
		font-family: "Roboto-Regular", arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		font-weight: 400;
		margin: 0;
		overflow: hidden;
		-webkit-text-size-adjust: 100%;
	}

	.ynRLnc {
		left: -9999px;
		position: absolute;
		top: -9999px;
	}

	.L6cTce {
		display: none;
	}

	.bltWBb {
		word-break: break-all;
	}

	.hSRGPd {
		color: #1a73e8;
		cursor: pointer;
		font-weight: 500;
		text-decoration: none;
	}

	.Bz112c-W3lGp {
		height: 16px;
		width: 16px;
	}

	.Bz112c-E3DyYd {
		height: 20px;
		width: 20px;
	}

	.Bz112c-r9oPif {
		height: 24px;
		width: 24px;
	}

	.Bz112c-uaxL4e {
		-webkit-border-radius: 10px;
		border-radius: 10px;
	}

	.LgbsSe-Bz112c {
		display: block;
	}

	.S9gUrf-YoZ4jf {
		border: none;
		margin: 0;
		padding: 0;

		* {
			border: none;
			margin: 0;
			padding: 0;
		}
	}

	.fFW7wc-ibnC6b > .aZ2wEe > div {
		border-color: #4285f4;
	}

	.P1ekSe-ZMv3u > div {
		&:nth-child(1) {
			background-color: #1a73e8 !important;
		}

		&:nth-child(2),
		&:nth-child(3) {
			background-image: linear-gradient(
					to right,
					rgba(255, 255, 255, 0.7),
					rgba(255, 255, 255, 0.7)
				),
				linear-gradient(to right, #1a73e8, #1a73e8) !important;
		}
	}

	.haAclf {
		display: inline-block;
	}

	.nsm7Bb-HzV7m-LgbsSe {
		-webkit-border-radius: 4px;
		border-radius: 4px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		-webkit-transition: background-color 0.218s, border-color 0.218s;
		transition: background-color 0.218s, border-color 0.218s;
		-webkit-user-select: none;
		-webkit-appearance: none;
		background-color: #fff;
		background-image: none;
		border: 1px solid #dadce0;
		color: #3c4043;
		cursor: pointer;
		font-family: "Google Sans", arial, sans-serif;
		font-size: 14px;
		height: 40px;
		letter-spacing: 0.25px;
		outline: none;
		overflow: hidden;
		padding: 0 12px;
		position: relative;
		text-align: center;
		vertical-align: middle;
		white-space: nowrap;
		width: auto;

		&.pSzOP-SxQuSe {
			font-size: 14px;
			height: 32px;
			letter-spacing: 0.25px;
			padding: 0 10px;
		}

		&.purZT-SxQuSe {
			font-size: 11px;
			height: 20px;
			letter-spacing: 0.3px;
			padding: 0 8px;
		}

		&.Bz112c-LgbsSe {
			padding: 0;
			width: 40px;

			&.pSzOP-SxQuSe {
				width: 32px;
			}

			&.purZT-SxQuSe {
				width: 20px;
			}
		}

		&.JGcpL-RbRzK {
			-webkit-border-radius: 20px;
			border-radius: 20px;

			&.pSzOP-SxQuSe {
				-webkit-border-radius: 16px;
				border-radius: 16px;
			}

			&.purZT-SxQuSe {
				-webkit-border-radius: 10px;
				border-radius: 10px;
			}
		}

		&.MFS4be-Ia7Qfc {
			border: none;
			color: #fff;
		}

		&.MFS4be-v3pZbf-Ia7Qfc {
			background-color: #1a73e8;
		}

		&.MFS4be-JaPV2b-Ia7Qfc {
			background-color: #202124;
			color: #e8eaed;
		}

		.nsm7Bb-HzV7m-LgbsSe-Bz112c {
			height: 18px;
			margin-right: 8px;
			min-width: 18px;
			width: 18px;
		}

		&.pSzOP-SxQuSe .nsm7Bb-HzV7m-LgbsSe-Bz112c {
			height: 14px;
			min-width: 14px;
			width: 14px;
		}

		&.purZT-SxQuSe .nsm7Bb-HzV7m-LgbsSe-Bz112c {
			height: 10px;
			min-width: 10px;
			width: 10px;
		}

		&.jVeSEe .nsm7Bb-HzV7m-LgbsSe-Bz112c {
			margin-left: 8px;
			margin-right: -4px;
		}

		&.Bz112c-LgbsSe {
			.nsm7Bb-HzV7m-LgbsSe-Bz112c {
				margin: 0;
				padding: 10px;
			}

			&.pSzOP-SxQuSe .nsm7Bb-HzV7m-LgbsSe-Bz112c {
				padding: 8px;
			}

			&.purZT-SxQuSe .nsm7Bb-HzV7m-LgbsSe-Bz112c {
				padding: 4px;
			}
		}

		.nsm7Bb-HzV7m-LgbsSe-Bz112c-haAclf {
			-webkit-border-top-left-radius: 3px;
			border-top-left-radius: 3px;
			-webkit-border-bottom-left-radius: 3px;
			border-bottom-left-radius: 3px;
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			justify-content: center;
			-webkit-align-items: center;
			align-items: center;
			background-color: #fff;
			height: 36px;
			margin-left: -10px;
			margin-right: 12px;
			min-width: 36px;
			width: 36px;

			.nsm7Bb-HzV7m-LgbsSe-Bz112c {
				margin: 0;
				padding: 0;
			}
		}

		&.Bz112c-LgbsSe
			.nsm7Bb-HzV7m-LgbsSe-Bz112c-haAclf
			.nsm7Bb-HzV7m-LgbsSe-Bz112c {
			margin: 0;
			padding: 0;
		}

		&.pSzOP-SxQuSe .nsm7Bb-HzV7m-LgbsSe-Bz112c-haAclf {
			height: 28px;
			margin-left: -8px;
			margin-right: 10px;
			min-width: 28px;
			width: 28px;
		}

		&.purZT-SxQuSe .nsm7Bb-HzV7m-LgbsSe-Bz112c-haAclf {
			height: 16px;
			margin-left: -6px;
			margin-right: 8px;
			min-width: 16px;
			width: 16px;
		}

		&.Bz112c-LgbsSe .nsm7Bb-HzV7m-LgbsSe-Bz112c-haAclf {
			-webkit-border-radius: 3px;
			border-radius: 3px;
			margin-left: 2px;
			margin-right: 0;
			padding: 0;
		}

		&.JGcpL-RbRzK .nsm7Bb-HzV7m-LgbsSe-Bz112c-haAclf {
			-webkit-border-radius: 18px;
			border-radius: 18px;
		}

		&.pSzOP-SxQuSe.JGcpL-RbRzK .nsm7Bb-HzV7m-LgbsSe-Bz112c-haAclf {
			-webkit-border-radius: 14px;
			border-radius: 14px;
		}

		&.purZT-SxQuSe.JGcpL-RbRzK .nsm7Bb-HzV7m-LgbsSe-Bz112c-haAclf {
			-webkit-border-radius: 8px;
			border-radius: 8px;
		}

		.nsm7Bb-HzV7m-LgbsSe-bN97Pc-sM5MNb {
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-align-items: center;
			align-items: center;
			-webkit-flex-direction: row;
			flex-direction: row;
			justify-content: space-between;
			-webkit-flex-wrap: nowrap;
			flex-wrap: nowrap;
			height: 100%;
			position: relative;
			width: 100%;
		}

		.oXtfBe-l4eHX {
			justify-content: center;
		}

		.nsm7Bb-HzV7m-LgbsSe-BPrWId {
			-webkit-flex-grow: 1;
			flex-grow: 1;
			font-family: "Google Sans", arial, sans-serif;
			font-weight: 500;
			overflow: hidden;
			text-overflow: ellipsis;
			vertical-align: top;
		}

		&.purZT-SxQuSe .nsm7Bb-HzV7m-LgbsSe-BPrWId {
			font-weight: 300;
		}

		.oXtfBe-l4eHX .nsm7Bb-HzV7m-LgbsSe-BPrWId {
			-webkit-flex-grow: 0;
			flex-grow: 0;
		}

		.nsm7Bb-HzV7m-LgbsSe-MJoBVe {
			-webkit-transition: background-color 0.218s;
			transition: background-color 0.218s;
			bottom: 0;
			left: 0;
			position: absolute;
			right: 0;
			top: 0;
		}

		&:hover,
		&:focus {
			-webkit-box-shadow: none;
			box-shadow: none;
			border-color: #d2e3fc;
			outline: none;
		}

		&:hover .nsm7Bb-HzV7m-LgbsSe-MJoBVe,
		&:focus .nsm7Bb-HzV7m-LgbsSe-MJoBVe {
			background: rgba(66, 133, 244, 0.04);
		}

		&:active .nsm7Bb-HzV7m-LgbsSe-MJoBVe {
			background: rgba(66, 133, 244, 0.1);
		}

		&.MFS4be-Ia7Qfc {
			&:hover .nsm7Bb-HzV7m-LgbsSe-MJoBVe,
			&:focus .nsm7Bb-HzV7m-LgbsSe-MJoBVe {
				background: rgba(255, 255, 255, 0.24);
			}

			&:active .nsm7Bb-HzV7m-LgbsSe-MJoBVe {
				background: rgba(255, 255, 255, 0.32);
			}
		}

		.n1UuX-DkfjY {
			-webkit-border-radius: 50%;
			border-radius: 50%;
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			height: 20px;
			margin-left: -4px;
			margin-right: 8px;
			min-width: 20px;
			width: 20px;
		}

		&.jVeSEe {
			.nsm7Bb-HzV7m-LgbsSe-BPrWId {
				font-family: "Roboto";
				font-size: 12px;
				text-align: left;

				.ssJRIf {
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.K4efff {
					.fmcmS {
						overflow: hidden;
						text-overflow: ellipsis;
					}

					display: -webkit-box;
					display: -webkit-flex;
					display: flex;
					-webkit-align-items: center;
					align-items: center;
					color: #5f6368;
					fill: #5f6368;
					font-size: 11px;
					font-weight: 400;
				}
			}

			&.MFS4be-Ia7Qfc .nsm7Bb-HzV7m-LgbsSe-BPrWId .K4efff {
				color: #e8eaed;
				fill: #e8eaed;
			}

			.nsm7Bb-HzV7m-LgbsSe-BPrWId .K4efff .Bz112c {
				height: 18px;
				margin: -3px -3px -3px 2px;
				min-width: 18px;
				width: 18px;
			}

			.nsm7Bb-HzV7m-LgbsSe-Bz112c-haAclf {
				-webkit-border-top-left-radius: 0;
				border-top-left-radius: 0;
				-webkit-border-bottom-left-radius: 0;
				border-bottom-left-radius: 0;
				-webkit-border-top-right-radius: 3px;
				border-top-right-radius: 3px;
				-webkit-border-bottom-right-radius: 3px;
				border-bottom-right-radius: 3px;
				margin-left: 12px;
				margin-right: -10px;
			}

			&.JGcpL-RbRzK .nsm7Bb-HzV7m-LgbsSe-Bz112c-haAclf {
				-webkit-border-radius: 18px;
				border-radius: 18px;
			}
		}
	}

	@media screen and (-ms-high-contrast: active) {
		.nsm7Bb-HzV7m-LgbsSe {
			border: 2px solid windowText;
			color: windowText;
		}
	}

	.L5Fo6c-sM5MNb {
		border: 0;
		display: block;
		left: 0;
		position: relative;
		top: 0;
	}

	.L5Fo6c-bF1uUb {
		-webkit-border-radius: 4px;
		border-radius: 4px;
		bottom: 0;
		cursor: pointer;
		left: 0;
		position: absolute;
		right: 0;
		top: 0;

		&:focus {
			border: none;
			outline: none;
		}
	}
`;
