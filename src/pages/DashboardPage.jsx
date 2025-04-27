import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import contractService from '../services/contractService'
import ContractCard from '../components/ContractCard'
import Button from '../components/Button'
import AlertMessage from '../components/AlertMessage'

function DashboardPage() {
  const [contracts, setContracts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const data = await contractService.getUserContracts()
        setContracts(data)
      } catch (error) {
        console.error('Error fetching contracts:', error)
        setError('Failed to load your contracts. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchContracts()
  }, [])
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Your Contracts</h1>
          <p className="text-gray-600 mt-1">
            Manage and analyze your legal documents
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Link to="/contracts/upload">
            <Button variant="primary" className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Upload Contract
            </Button>
          </Link>
        </div>
      </div>
      
      {error && (
        <AlertMessage
          type="error"
          message={error}
          onClose={() => setError('')}
        />
      )}
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : contracts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No contracts yet</h3>
          <p className="mt-2 text-gray-600">
            Upload your first contract to get started with the analysis.
          </p>
          <div className="mt-6">
            <Link to="/contracts/upload">
              <Button variant="primary">Upload Contract</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contracts.map((contract) => (
            <ContractCard key={contract.id} contract={contract} />
          ))}
        </div>
      )}
    </div>
  )
}

export default DashboardPage