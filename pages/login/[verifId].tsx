import { useRouter } from 'next/router'
import useSWR from 'swr'
import Layout from '../../components/Layout'
import fetcher from '../../lib/fetchJson'
export default function SignUpVerification() {
	const routes = useRouter()

	const { verifId } = routes.query

	const { data, error } = useSWR(`/api/sign_up/${verifId}`, (url) =>
		fetcher(url, {
			method: 'PATCH',
		})
	)

	if (!data && !error) {
		return (
			<Layout>
				<div className="self-center">
					Please wait while we verify your account...
				</div>
			</Layout>
		)
	}

	return (
		<Layout>
			{!error ? (
				<p>Congratulations, you are now an official member of AlgoShare</p>
			) : (
				<p>{error}</p>
			)}
		</Layout>
	)
}
