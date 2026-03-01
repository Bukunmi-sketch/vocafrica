import type React from "react"

interface LoadingModalProps {
  message?: string
}

const LoadingModal: React.FC<LoadingModalProps> = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-9999">
      <div className=" p-6 rounded-lg bg-white  flex flex-col items-center z-9999">
        <div className="w-12 h-12 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-700 font-medium">{message}</p>
      </div>
    </div>
  )
}

export default LoadingModal

