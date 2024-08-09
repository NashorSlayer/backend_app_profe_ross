export const selectFormWithoutId = {
  title: true,
  description: true,
  date_start: true,
  date_end: true,
  type: true,
  range: true,
  user: {
    select: {
      username: true,
      email: true
    }
  }
}

export const selectFormsWithId = {
  id: true,
  title: true,
  description: true,
  date_start: true,
  date_end: true,
  type: true,
  range: true,
  user: {
    select: {
      username: true,
      email: true
    }
  }
}

export const selectTitlesByUser = {
  id: true,
  title: true
}