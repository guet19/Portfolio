import db from "$lib/server/db.js"

export async function load({params}) {
    return {
        project: await db.getProjectBySlug(params.slug)

    }

}
