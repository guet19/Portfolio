import db from "$lib/server/db.js"

export async function load() {
    return {
        projects: await db.getProjects()
    }
}