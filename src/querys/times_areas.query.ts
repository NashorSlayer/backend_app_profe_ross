export const selectTimesAreas = {
    id: true,
    time_start: true,
    time_end: true,
    area: {
        select: {
            name: true,
        }
    },
    answer: {
        select: {
            mail: true,
            form: {
                select: {
                    title: true
                }
            }
        }
    }
}