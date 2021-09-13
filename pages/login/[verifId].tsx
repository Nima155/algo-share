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
		return <Layout>Loading...</Layout>
	}

	return (
		<Layout>
			Congratulations, you are now an official member of AlgoShare
		</Layout>
	)
}
