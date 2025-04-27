function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                <p className="text-center md:text-left">
                    &copy; {new Date().getFullYear()} Contract Analyzer. All rights reserved.
                </p>
                </div>
                <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-300">Privacy Policy</a>
                <a href="#" className="hover:text-blue-300">Terms of Service</a>
                <a href="#" className="hover:text-blue-300">Contact</a>
                </div>
            </div>
            </div>
        </footer>
        )
  }
  
  export default Footer