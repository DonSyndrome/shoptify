/// <reference types="next" />
/// <reference types="next/types/global" />

declare namespace JSX {
	interface IntrinsicElements {
		[elemName: string]: any;
		div:React.DetailedAMPHTMLProps<React.HTMLAttributes<HTMLAmpDivElement>, HTMLAmpDivElement>;
	}
	interface HTMLAmpDivElement extends HTMLDivElement { 
		fallback?: boolean;
	}
}
type DetailedAMPHTMLProps<E extends React.DetailedHTMLProps<T>, T> = ClassAttributes<T>;
