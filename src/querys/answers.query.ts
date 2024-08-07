export const selectAnswers = {
    id: true,
    mail: true,
    form: {
        select: {
            id: true,
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