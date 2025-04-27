import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import contractService from '../services/contractService'
import Button from '../components/Button'
import AlertMessage from '../components/AlertMessage'

function UploadContractPage() {
  const [file, setFile] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const navigate = useNavigate()
  
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }
  
  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0])
    }
  }
  
  const handleFileChange = (selectedFile) => {
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase()
    
    if (fileExtension !== 'pdf' && fileExtension !== 'docx') {
      setError('Only PDF and DOCX files are supported.')
      setFile(null)
      return
    }
    
    setFile(selectedFile)
    setError('')
  }
  
  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0])
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!file) {
      setError('Please select a file to upload')
      return
    }
    
    try {
      setLoading(true)
      const response = await contractService.uploadContract(file)
      navigate(`/contracts/${response.id}`)
    } catch (error) {
      console.error('Error uploading contract:', error)
      setError(error.response?.data?.detail || 'Failed to upload contract. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Upload Contract</h1>
        <p className="text-gray-600 mt-1">
          Upload a contract document in PDF or DOCX format for analysis
        </p>
      </div>
      
      {error && (
        <AlertMessage
          type="error"
          message={error}
          onClose={() => setError('')}
        />
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <div 
              className={`relative border-2 border-dashed rounded-lg p-8 text-center ${
                dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="contract-file"
                accept=".pdf,.docx"
                onChange={handleFileInputChange}
                className="hidden"
              />
              
              <label 
                htmlFor="contract-file"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                {file ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="mt-2 text-lg font-medium text-gray-900">{file.name}</p>
                    <p className="mt-1 text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
                    </p>
                    <Button
                      type="button"
                      variant="secondary"
                      className="mt-4"
                      onClick={() => setFile(null)}
                    >
                      Change File
                    </Button>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mt-2 text-lg font-medium text-gray-900">
                      Drag and drop your file here or click to browse
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Supported file types: PDF, DOCX
                    </p>
                  </>
                )}
              </label>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={loading}
              disabled={!file}
            >
              Upload
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UploadContractPage