import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import { IUserSession } from '../utils/types'

export default function useUser({
	redirectTo = '',
	redirectIfFound = false,
} = {}) {
	const { data: user, mutate: mutateUser } = useSWR<IUserSession, Error>(
		'/api/user'
	)

	useEffect(() => {
		let mounted = true
		// if no redirect needed, just return (example: already on /dashboard)
		// if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
		if (mounted) {
			if (!redirectTo || !user) return

			if (
				// If redirectTo is set, redirect if the user was not found.
				(redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
				// If redirectIfFound is also set, redirect if the user was found
				(redirectIfFound && user?.isLoggedIn)
			) {
				Router.push(redirectTo)
			}
		}
		return () => {
			mounted = false
		}
	}, [user, redirectIfFound, redirectTo])

	return { user, mutateUser }
}
