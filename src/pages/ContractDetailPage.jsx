import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import contractService from '../services/contractService'
import Button from '../components/Button'
import AlertMessage from '../components/AlertMessage'

function ContractDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [contract, setContract] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const [analysis, setAnalysis] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisError, setAnalysisError] = useState('')
  
  useEffect(() => {
    const fetchContract = async () => {
      try {
        const data = await contractService.getContractById(id)
        setContract(data)
      } catch (error) {
        console.error('Error fetching contract:', error)
        setError('Failed to load contract. It may have been deleted or you may not have permission to view it.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchContract()
  }, [id])
  
  const handleAnalyze = async () => {
    try {
      setAnalyzing(true)
      setAnalysisError('')
      
      const results = await contractService.analyzeContract(id)
      setAnalysis(results.analysis)
    } catch (error) {
      console.error('Error analyzing contract:', error)
      setAnalysisError(error.response?.data?.detail || 'Failed to analyze contract. Please try again.')
    } finally {
      setAnalyzing(false)
    }
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <AlertMessage type="error" message={error} />
        <div className="mt-4">
          <Button variant="primary" onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    )
  }
  
  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 truncate" title={contract.filename}>
            {contract.filename}
          </h1>
          <div className="flex items-center mt-1">
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 uppercase mr-2">
              {contract.file_type}
            </span>
            <span className="text-sm text-gray-600">
              Uploaded on {new Date(contract.uploaded_at).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0">
          {!analysis && !analyzing && (
            <Button 
              variant="primary"
              onClick={handleAnalyze}
              className="flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
              Analyze Contract
            </Button>
          )}
        </div>
      </div>
      
      {analysisError && (
        <AlertMessage
          type="error"
          message={analysisError}
          onClose={() => setAnalysisError('')}
        />
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document Preview */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 h-full">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Document Content</h2>
            <div className="bg-gray-50 border border-gray-200 rounded p-4 h-[500px] overflow-y-auto">
              <pre className="whitespace-pre-wrap font-mono text-sm">
                {contract.content}
              </pre>
            </div>
          </div>
        </div>
        
        {/* Analysis Results */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 h-full">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Analysis Results</h2>
            
            {analyzing ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-600">Analyzing your contract...</p>
              </div>
            ) : analysis ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium text-gray-800 mb-2">Termination Clause</h3>
                  <div className="bg-gray-50 border border-gray-200 rounded p-3">
                    <p className="text-sm text-gray-700">{analysis.termination_clause}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium text-gray-800 mb-2">Confidentiality Clause</h3>
                  <div className="bg-gray-50 border border-gray-200 rounded p-3">
                    <p className="text-sm text-gray-700">{analysis.confidentiality_clause}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium text-gray-800 mb-2">Payment Terms</h3>
                  <div className="bg-gray-50 border border-gray-200 rounded p-3">
                    <p className="text-sm text-gray-700">{analysis.payment_terms}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium text-gray-800 mb-2">Governing Law</h3>
                  <div className="bg-gray-50 border border-gray-200 rounded p-3">
                    <p className="text-sm text-gray-700">{analysis.governing_law}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium text-gray-800 mb-2">Limitation of Liability</h3>
                  <div className="bg-gray-50 border border-gray-200 rounded p-3">
                    <p className="text-sm text-gray-700">{analysis.limitation_of_liability}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <p className="mt-4 text-gray-600">
                  Click "Analyze Contract" to extract key legal clauses from this document.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContractDetailPage
