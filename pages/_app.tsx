import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import fetcher from '../lib/fetchJson'
import { SWRConfig } from 'swr'
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SWRConfig // will provide the same fetcher to all SWR hooks for fetching.. in this case fetchJson
			value={{
				fetcher,
				onError: (e) => {
					console.error(e)
				},
			}}
		>
			<Component {...pageProps} />
		</SWRConfig>
	)
}
export default MyApp
