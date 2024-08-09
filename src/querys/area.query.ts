export const selectAreas = {
    id: true,
    name: true,
    form: {
        select: {
            title: true,
            description: true,
            date_start: true,
            date_end: true,
            type: true,
            range: true,
            user: {
                select: {
                    email: true,
                    username: true
                }
            }
        }
    }
}