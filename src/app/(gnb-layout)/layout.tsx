import React, { ReactElement, ReactNode } from "react";

import { GnbLayout } from "pages/gnb";

export interface GnbAppLayoutProps {
	children?: ReactNode;
}

export default function GnbAppLayout(props: GnbAppLayoutProps): ReactElement {
	return <GnbLayout>{props.children}</GnbLayout>;
}
