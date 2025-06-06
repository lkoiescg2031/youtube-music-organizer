import classNames from "classnames";
import React from "react";
import styled from "styled-components";

export interface YoutubeIconProps {
	className?: string;
}

export default function YoutubeIcon(
	props: YoutubeIconProps
): React.ReactElement {
	return (
		<StyledYoutubeSvg className={classNames("youtube-icon", props.className)}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				version="1.1"
				viewBox="0 0 512 512"
			>
				<path
					className={classNames("background")}
					d="M506.703,145.655c0,0-5.297-37.959-20.303-54.731c-19.421-22.069-41.49-22.069-51.2-22.952C363.697,62.676,256,61.793,256,61.793l0,0c0,0-107.697,0.883-179.2,6.179c-9.71,0.883-31.779,1.766-51.2,22.952C9.71,107.697,5.297,145.655,5.297,145.655S0,190.676,0,235.697v41.49c0,45.021,5.297,89.159,5.297,89.159s5.297,37.959,20.303,54.731c19.421,22.069,45.021,21.186,56.497,23.835C122.703,449.324,256,450.207,256,450.207s107.697,0,179.2-6.179c9.71-0.883,31.779-1.766,51.2-22.952c15.007-16.772,20.303-54.731,20.303-54.731S512,321.324,512,277.186v-41.49C512,190.676,506.703,145.655,506.703,145.655"
				/>
				<polygon
					className={classNames("play-icon")}
					points="194.207,166.841 194.207,358.4 361.931,264.828 "
				/>
			</svg>
		</StyledYoutubeSvg>
	);
}

const StyledYoutubeSvg = styled.i`
	&.youtube-icon {
		.background {
			fill: #ff0000;
		}
		.play-icon {
			fill: #ffffff;
		}
	}
`;
