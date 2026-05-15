import { useState, useEffect } from 'react'
import { Conversation, Customer } from '../lib/types'
import { useConversations } from '../lib/db-hooks'
import { fetchCustomerById } from '../lib/db-hooks-v2'
import { Loader, Search } from 'lucide-react'

interface ConversationListProps {
  onSelectConversation: (conversation: Conversation) => void
  selectedId?: string
}

interface ConversationItemData {
  conversation: Conversation
  customer: Customer | null
}

export function ConversationsList({ onSelectConversation, selectedId }: ConversationListProps) {
  const [conversations, setConversations] = useState<ConversationItemData[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    setLoading(true)
    // Pass null as branchId to fetch ALL conversations regardless of branch
    useConversations(page, '', searchTerm, null)
      .then(async (result) => {
        console.log('📋 Conversations fetched:', result)
        // Fetch customer details for each conversation
        const itemsWithCustomers = await Promise.all(
          result.data.map(async (conv) => ({
            conversation: conv as Conversation,
            customer: await fetchCustomerById(conv.customer_id).catch(() => null),
          }))
        )
        console.log('👥 Conversations with customers:', itemsWithCustomers)
        setConversations(itemsWithCustomers)
      })
      .catch((error) => {
        console.error('❌ Failed to fetch conversations:', error)
        setConversations([])
      })
      .finally(() => setLoading(false))
  }, [page, searchTerm])

  return (
    <div className="w-full lg:w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Search Bar */}
      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setPage(1)
            }}
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-20">
            <Loader className="animate-spin text-blue-500" size={24} />
          </div>
        ) : conversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <p className="text-sm">No conversations found</p>
          </div>
        ) : (
          conversations.map((item) => (
            <button
              key={item.conversation.id}
              onClick={() => onSelectConversation(item.conversation)}
              className={`w-full p-3 border-b border-gray-100 text-left hover:bg-gray-50 transition-colors ${
                selectedId === item.conversation.id ? 'bg-green-50 border-l-4 border-l-green-500' : ''
              }`}
            >
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {item.customer?.name || 'Unknown'}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">
                    {item.customer?.phone || item.conversation.customer_id}
                  </p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                  item.conversation.status === 'active_bot'
                    ? 'bg-blue-100 text-blue-700'
                    : item.conversation.status === 'awaiting_human'
                    ? 'bg-yellow-100 text-yellow-700'
                    : item.conversation.status === 'human_handling'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {item.conversation.status === 'active_bot'
                    ? '🤖'
                    : item.conversation.status === 'awaiting_human'
                    ? '⏳'
                    : item.conversation.status === 'human_handling'
                    ? '👤'
                    : '✓'}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {item.conversation.updated_at
                  ? new Date(item.conversation.updated_at).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })
                  : 'N/A'}
              </p>
            </button>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="border-t border-gray-200 p-2 flex justify-between text-sm">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 rounded"
        >
          ← Prev
        </button>
        <span className="text-gray-600">Page {page}</span>
        <button
          onClick={() => setPage(p => p + 1)}
          className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
