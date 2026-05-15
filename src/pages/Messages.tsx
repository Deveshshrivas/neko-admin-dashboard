import { useState } from 'react'
import { Conversation } from '../lib/types'
import { ConversationsList } from '../components/ConversationsList'
import { MessagesThread } from '../components/MessagesThread'

export function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [showList, setShowList] = useState(true)

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation)
    setShowList(false)
  }

  const handleCloseThread = () => {
    setSelectedConversation(null)
    setShowList(true)
  }

  return (
    <div className="flex h-full min-h-0 bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Desktop */}
      <div className="hidden lg:flex min-h-0 w-full">
        <ConversationsList
          onSelectConversation={handleSelectConversation}
          selectedId={selectedConversation?.id}
        />
        <MessagesThread conversation={selectedConversation} />
      </div>

      {/* Mobile */}
      {showList && (
        <div className="lg:hidden flex w-full min-h-0">
          <ConversationsList
            onSelectConversation={handleSelectConversation}
            selectedId={selectedConversation?.id}
          />
        </div>
      )}

      {!showList && (
        <div className="lg:hidden flex w-full min-h-0">
          <MessagesThread
            conversation={selectedConversation}
            onClose={handleCloseThread}
          />
        </div>
      )}
    </div>
  )
}
