import fetch from 'node-fetch'

const NOTISEND_TOKEN = 'a0b9de66365e7dabfe152d326e06c846'
const NOTISEND_BASE_URI = 'https://api.notisend.ru/v1'
const NOTISEND_GROUP = '372208'

export const addNotisendRecipient = async (email: string) => {
	const url = `${NOTISEND_BASE_URI}/email/lists/${NOTISEND_GROUP}/recipients`
	const payload = { email }

	await fetch(url, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${NOTISEND_TOKEN}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	})
}
