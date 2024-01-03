const defaultPagination = {
  limit: 5,
  offset: 0
}

export default httpClient => ({
  getAll: async ({type, limit, offset} = defaultPagination) => {
    try {
      const query = {limit, offset}
      if (type) {
        query.type = type
      }
      const response = await httpClient.get('/feedbacks', {params: query})

      return { data: response.data }
    } catch (error) {
      throw new Error(error.message)
    }

  },
  getSummary: async () => {
    try {
      const response = await httpClient.get('/feedbacks/summary')
      return { data: response.data }
    } catch (error) {
      throw new Error(error.message)
    }
  }
})
