import type { Request, Response } from 'express'
import { userService } from '../models/user.js'
import { type IParticipant, participantService } from '../models/participant.js'
import { addNotisendRecipient } from '../util.js'

const clearParticipants = async (ids: number[]) => {
	for (const id of ids) {
		await participantService.deleteById(id)
	}
}

export const createNewUser = async (req: Request, res: Response) => {
	try {
		const data = req.body
		const activeReg = false
		let amount: number

		if (+data.amount < 1) amount = 1 
		else if (+data.amount > 5) amount = 5
		else amount = +data.amount

		let success = false
		let participants: IParticipant[] = []
		const ids: number[] = []

		for (let i = 0; i < amount; i++) {
			participants.push({
				fio: data[`fio${i}`],
				email: data[`email${i}`] ? (data[`email${i}`] as string).trim() : null,
				age: data[`age${i}`],
				phone: data[`phone${i}`],
				education: data[`education${i}`],
				school: data[`school${i}`]
			})
		}

		const user = {
			type: Object.keys(data).includes('team_type') ? 'single' : 'team',
			case: data.case,
			teamTitle: data.team_title ? (data.team_title as string).trim() : null,
			specialization: data.role || null,
			membersAmount: amount,
			referrer: data.referrer || null,
			participants: []
		}

		let duplicatedEmails = false
		const emails = []
		for (const participant of participants) {
			if (!emails.includes(participant.email)) {
				emails.push(participant.email)
			}
			else {
				duplicatedEmails = true
			}
		}

		if (duplicatedEmails) {
			res.json({
				ok: false,
				error: 'У каждого участника команды необходимо указать уникальный email'
			})
			return
		}

		if (user.teamTitle) {
			const team = await userService.get({ where: { teamTitle: user.teamTitle } })

			if (team.length) {
				res.json({
					ok: false,
					error: 'Команда с таким названием уже зарегистрирована. Попробуйте придумать другое название'
				})
				return
			}
		}

		if (!activeReg) {
			res.json({
				ok: false,
				error: 'К сожалению регистрация на хакатон завершена'
			})
			return
		}

		try {
			for (const participant of participants) {
				const duplicate = await participantService.get({ where: { email: participant.email } })
				if (duplicate.length) {
					if (ids.length) await clearParticipants(ids)
					res.json({
						ok: false,
						error: 'Участник с таким Email уже зарегистрирован'
					})
					return
				}
				const result = await participantService.create(participant)
				ids.push(result.id)
			}

			user.participants = ids
			await userService.create(user)
			success = true

			for (const participant of participants) {
				addNotisendRecipient(participant.email)
			}

			res.json({
				ok: true,
				message: 'Отлично, вы зарегистрировались! Скоро организаторы свяжутся с вами'
			})
		}
		catch (e) {
			if (!success && ids.length) {
				clearParticipants(ids)
			}

			res.json({
				ok: false,
				error: (e.message as string).replace('Validation Error: ', '')
			})

			return
		}
	}
	catch (e) {
		res.json({
			ok: false,
			error: 'Произошла ошибка во время регистрации. Пожалуйста, повторите попытку позднее'
		})
		console.error(e)
	}
}
