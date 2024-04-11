import db from '$db/mongo'

// Admin
export const admin = db.collection('admin')
// Equipment
export const equipment = db.collection('equipment')
// Technician
export const technician = db.collection('technician')