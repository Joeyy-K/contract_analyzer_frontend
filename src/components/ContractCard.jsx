import { Link } from 'react-router-dom'
import { formatDate } from '../utils/formatters'

function ContractCard({ contract }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-gray-800 truncate" title={contract.filename}>
            {contract.filename}
            </h3>
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 uppercase">
            {contract.file_type}
            </span>
        </div>
        
        <div className="text-sm text-gray-500 mb-4">
            Uploaded: {formatDate(contract.uploaded_at)}
        </div>
        
        <div className="flex justify-end">
            <Link 
            to={`/contracts/${contract.id}`}
            className="px-3 py-1 text-sm font-medium rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
            View Details
            </Link>
        </div>
        </div>
    )
}

export default ContractCard