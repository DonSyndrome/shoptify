/// <reference types="node" />
/// <reference types="next" />
/// <reference types="react" />
/// <reference types="next/types/global" />
/// <reference path='mongoose.d.ts' />

import {
	NextPageContext,
} from 'next-server/dist/lib/utils'


/**
 * `Page` type, use it as a guide to create `pages`.
 */
export type MyNextPage<P = {}, IP = P> = {
	(props: P): JSX.Element
  /**
   * Used for initial page load data population. Data returned from `getInitialProps` is serialized when server rendered.
   * Make sure to return plain `Object` without using `Date`, `Map`, `Set`.
   * @param ctx Context of `page`
   */
	getInitialProps?(ctx: MyNextPageContext): Promise<IP>
}

export interface MyNextPageContext extends NextPageContext {
	/**
	 * `HTTP` request object.
	 */
	req?: MyIncomingMessage;
}

export class MyIncomingMessage extends IncomingMessage {
	// my stuff !!!!!
	session: any;
	mongodb: any;
}

declare	namespace JSX {
	interface AmpImg {
		alt?: string;
		src?: string;
		width?: string;
		height?: string;
		layout?: string;
	}

	interface IntrinsicElements {
		'amp-img': AmpImg;
		div: React.DetailedAMPHTMLProps<React.HTMLAttributes<HTMLAmpDivElement>, HTMLAmpDivElement>;
		// div: DetailedHTMLFactory<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

	}
}
// DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

type DetailedAMPHTMLProps<E extends React.DetailedHTMLProps<T>, T> = ClassAttributes<T>;


// Extend the React types with missing properties
// declare module 'react' {

// 	interface HTMLAmpDivElement extends HTMLDivElement {
// 		fallback?: boolean;
// 	}
// 	interface ReactHTML {
// 		// div: DetailedHTMLFactory<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
// 	}
// }