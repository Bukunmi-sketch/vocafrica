import type React from "react"
import { Loader2 } from "lucide-react"

interface AIChatLoaderProps {
  assistantSessionId: string
}

const AIChatLoader: React.FC<AIChatLoaderProps> = ({ assistantSessionId }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-2">
      <Loader2 className="h-8 w-8 text-primary animate-spin" />
      <div className="text-sm text-gray-500">
        <p>Initializing chat session...</p>
        <p className="text-xs text-gray-400">Session ID: {assistantSessionId.substring(0, 8)}...</p>
      </div>
    </div>
  )
}

export default AIChatLoader
