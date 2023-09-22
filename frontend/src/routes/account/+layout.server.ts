import { apiRoute } from '$lib/utilities'
import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ fetch, cookies }) => {
    const options: RequestInit = {
        headers: {
            Authorization: cookies.get('token')
        }
    }
    const response = await fetch(apiRoute('user/validate'), options)

    if (response.ok) {
        const user = (await response.json()).user
        return { user }
    } else {
        throw redirect(307, '/login')
    }
}
