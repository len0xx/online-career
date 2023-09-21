import { apiRoute } from '$lib/utilities'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ fetch, cookies }) => {
    // Костыль, но на сервере по-другому не работает
    const options: RequestInit = {
        headers: {
            'Authorization': cookies.get('token')
        }
    }
    console.log(cookies.get('token'))
    const response = await fetch(apiRoute('user/validate'), options)
    console.log(response)

    if (response.ok) {
        const user = (await response.json()).user
        return { user }
    }
}
