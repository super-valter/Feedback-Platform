export default httpClient => ({
  getMe: async () => {
    try {
      const response = await httpClient.get('/users/me')
      return {
        data: response.data
      }
    } catch (error) {
      return {
        data: []
      }
    }

  },
  generateApiKey: async () => {
    const response = await httpClient.post('/users/me/apikey')

    return {
      data: response.data
    }
  }
})
