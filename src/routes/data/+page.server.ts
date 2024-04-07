// @ts-ignore
import { equipment } from "$db/equipment";
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async function() {
	const equipments = await equipment.find({}, { projection: { _id: 0 } }).toArray();
	// const equipments = await equipment.find({}, { limit: 1, projection: { _id: 0 } }).toArray();
	// const equipments = await equipment.find({}, { limit: 1}).toArray()
  // console.log(equipments)
	
	// destructure to remove _id 

	return { equipments }
}