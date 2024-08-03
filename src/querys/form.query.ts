export const selectForms = {
    id: true,
          title: true,
          description: true,
          date_start: true,
          date_end: true,
          user: {
            select: {
              username: true,
              email: true
            }
          }
}