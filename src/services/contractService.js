import api from './api'

const contractService = {
    getUserContracts: async () => {
        try {
        const response = await api.get('/contracts')
        return response.data
        } catch (error) {
        console.error('Error fetching contracts:', error)
        throw error
        }
    },
    
    getContractById: async (id) => {
        try {
        const response = await api.get(`/contracts/${id}`)
        return response.data
        } catch (error) {
        console.error(`Error fetching contract ${id}:`, error)
        throw error
        }
    },
    
    uploadContract: async (file) => {
        try {
        const formData = new FormData()
        formData.append('file', file)
        
        const response = await api.post('/contracts/upload', formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        })
        
        return response.data
        } catch (error) {
        console.error('Error uploading contract:', error)
        throw error
        }
    },
  
    analyzeContract: async (id) => {
        try {
        const response = await api.post(`/contracts/${id}/analyze`)
        return response.data
        } catch (error) {
        console.error(`Error analyzing contract ${id}:`, error)
        throw error
        }
    }
}

export default contractService