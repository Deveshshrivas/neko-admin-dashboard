import { useState, useEffect, useRef } from 'react'
import { Conversation, Customer, Message } from '../lib/types'
import { useMessagesByConversation as fetchMessagesByConversation } from '../lib/db-hooks'
import {
  fetchConversationById,
  fetchCustomerById,
  fetchLatestHandoverSessionByConversation,
} from '../lib/db-hooks-v2'
import { N8N_CONFIG } from '../lib/schema'
import { Send, Loader, Zap, User, FileText } from 'lucide-react'

interface MessagesThreadProps {
  conversation: Conversation | null
  onClose?: () => void
}

interface SummaryLine {
  role?: string
  content_text?: string | null
  content?: string | null
  message_type?: string | null
}

function formatSummaryLines(summary: string | null | undefined) {
  if (!summary) return []

  try {
    const parsed = JSON.parse(summary) as unknown
    if (Array.isArray(parsed)) {
      return parsed
        .map((item) => {
          if (!item || typeof item !== 'object') return ''
          const line = item as SummaryLine
          const label = line.role ? `${line.role}: ` : ''
          const text = line.content_text || line.content || line.message_type || ''
          return `${label}${text}`.trim()
        })
        .filter(Boolean)
    }

    if (parsed && typeof parsed === 'object' && 'summary' in parsed) {
      const value = (parsed as { summary?: unknown }).summary
      return typeof value === 'string' && value.trim() ? [value.trim()] : []
    }
  } catch {
    return [summary]
  }

  return [summary]
}

export function MessagesThread({ conversation, onClose }: MessagesThreadProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [summaryLines, setSummaryLines] = useState<string[]>([])
  const [summaryLoading, setSummaryLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sendError, setSendError] = useState<string | null>(null)
  const [reply, setReply] = useState('')
  const [isHumanMode, setIsHumanMode] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Fetch customer details
  useEffect(() => {
    if (conversation?.customer_id) {
      fetchCustomerById(conversation.customer_id)
        .then((data) => {
          console.log('👤 Customer fetched:', data)
          setCustomer(data)
        })
        .catch((err) => {
          console.error('❌ Failed to fetch customer:', err)
          setCustomer(null)
        })
    } else {
      setCustomer(null)
    }
  }, [conversation?.customer_id])

  // Fetch n8n handover/conversation summary
  useEffect(() => {
    if (!conversation?.id) {
      setSummaryLines([])
      return
    }

    setSummaryLoading(true)
    Promise.all([
      fetchConversationById(conversation.id).catch(() => conversation),
      fetchLatestHandoverSessionByConversation(conversation.id).catch(() => null),
    ])
      .then(([freshConversation, handoverSession]) => {
        const handoverLines = formatSummaryLines(handoverSession?.summary)
        const conversationLines = formatSummaryLines(freshConversation?.summary_th)
        setSummaryLines(handoverLines.length > 0 ? handoverLines : conversationLines)
      })
      .finally(() => setSummaryLoading(false))
  }, [conversation])

  // Fetch messages
  useEffect(() => {
    if (conversation?.id) {
      setLoading(true)
      setError(null)
      fetchMessagesByConversation(conversation.id)
        .then((result) => {
          console.log('💬 Messages fetched:', result)
          // Messages are already ordered from DB, no need to reverse
          setMessages(result.data)
          setError(null)
        })
        .catch((err) => {
          console.error('❌ Failed to fetch messages:', err)
          setError('Failed to load messages')
          setMessages([])
        })
        .finally(() => setLoading(false))
    } else {
      setMessages([])
    }
  }, [conversation?.id])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [conversation?.id, messages])

  const handleSendReply = async () => {
    const text = reply.trim()
    if (!text || !conversation || sending) return

    if (!N8N_CONFIG.humanReplyWebhookUrl) {
      setSendError('n8n human reply webhook is not configured')
      return
    }

    const createdAt = new Date().toISOString()
    const messageRole = isHumanMode ? 'employee' : 'bot'
    
    const optimisticMessage: Message = {
      id: `pending-${createdAt}`,
      conversation_id: conversation.id,
      channel_account_id: conversation.channel_account_id,
      role: messageRole,
      direction: 'outbound',
      message_type: 'text',
      content_text: text,
      content_media_url: null,
      content_media_type: null,
      external_message_id: null,
      channel: 'whatsapp',
      sender_employee_id: null,
      wa_template_slug: null,
      delivery_status: 'sent',
      processing_status: 'processing',
      llm_intent: null,
      llm_confidence: null,
      metadata: { source: 'admin_dashboard', pending: true, mode: isHumanMode ? 'human' : 'bot' },
      created_at: createdAt,
    }

    setSending(true)
    setSendError(null)
    setMessages((current) => [...current, optimisticMessage])
    setReply('')

    const payload = {
      0: { status: conversation.status },
      source: 'admin_dashboard',
      event: isHumanMode ? 'human_reply' : 'bot_reply',
      status: conversation.status,
      text,
      message: {
        role: messageRole,
        direction: 'outbound',
        message_type: 'text',
        content_text: text,
        created_at: createdAt,
      },
      recipient: {
        customer_id: conversation.customer_id,
        whatsapp_phone: customer?.phone || null,
      },
      conversation: {
        id: conversation.id,
        status: conversation.status,
        customer_id: conversation.customer_id,
        channel_account_id: conversation.channel_account_id,
        branch_id: conversation.branch_id,
      },
      customer,
    }

    try {
      const response = await fetch(N8N_CONFIG.humanReplyWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`n8n returned ${response.status}`)
      }

      const refreshed = await fetchMessagesByConversation(conversation.id)
      setMessages(refreshed.data)
    } catch (err) {
      console.error('Failed to send reply through n8n:', err)
      setSendError('Failed to send message through n8n')
      setMessages((current) => current.filter((message) => message.id !== optimisticMessage.id))
      setReply(text)
    } finally {
      setSending(false)
    }
  }

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500">Select a conversation to view messages</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 min-w-0 min-h-0 flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {customer?.name || 'Unknown Customer'}
          </h2>
          <p className="text-sm text-gray-500">
            {customer?.phone || conversation.customer_id}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Mode Toggle */}
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
            <button
              onClick={() => setIsHumanMode(false)}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
                !isHumanMode
                  ? 'bg-blue-500 text-white'
                  : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
              title="Bot mode - AI will respond"
            >
              <Zap size={16} />
              <span className="text-sm font-medium">Bot</span>
            </button>
            <button
              onClick={() => setIsHumanMode(true)}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
                isHumanMode
                  ? 'bg-green-500 text-white'
                  : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
              title="Human mode - Employee will respond"
            >
              <User size={16} />
              <span className="text-sm font-medium">Human</span>
            </button>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 lg:hidden"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {(summaryLoading || summaryLines.length > 0) && (
        <div className="border-b border-gray-200 bg-amber-50 px-4 py-3">
          <div className="flex items-start gap-2">
            <FileText className="mt-0.5 flex-shrink-0 text-amber-700" size={16} />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-amber-900">Handover summary</p>
              {summaryLoading ? (
                <p className="text-sm text-amber-700">Loading summary...</p>
              ) : (
                <div className="mt-1 space-y-1">
                  {summaryLines.slice(0, 5).map((line, index) => (
                    <p key={`${index}-${line}`} className="text-sm text-amber-900">
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Messages Container */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white flex flex-col">
        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg">
            <p className="text-sm">{error}</p>
          </div>
        )}
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader className="animate-spin text-blue-500" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">No messages yet</p>
          </div>
        ) : (
          <div className="mt-auto space-y-3">
            {messages.map((message) => {
            const isFromUser = message.role === 'customer'
            const isFromBot = message.role === 'bot'
            const timestamp = new Date(message.created_at).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })

            return (
              <div
                key={message.id}
                className={`flex ${isFromUser ? 'justify-start' : 'justify-end'} gap-2`}
              >
                <div
                  className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                    isFromUser
                      ? 'bg-gray-200 text-gray-900'
                      : isFromBot
                      ? 'bg-blue-500 text-white'
                      : 'bg-green-500 text-white'
                  }`}
                >
                  {/* Role badge for non-customer messages */}
                  {!isFromUser && (
                    <p className="text-xs font-semibold opacity-75 mb-1">
                      {isFromBot ? '🤖 Bot' : '👤 Employee'}
                    </p>
                  )}
                  <p className="break-words">{message.content_text}</p>
                  <p className={`text-xs mt-1 ${
                    isFromUser 
                      ? 'text-gray-600' 
                      : isFromBot
                      ? 'text-blue-100'
                      : 'text-green-100'
                  }`}>
                    {timestamp}
                  </p>
                </div>
              </div>
            )
            })}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        {sendError && (
          <p className="mb-2 text-sm text-red-600">{sendError}</p>
        )}
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <input
              type="text"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendReply()
                }
              }}
              placeholder={isHumanMode ? "You (Human): Type a message..." : "Bot: Type a message..."}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                isHumanMode 
                  ? 'border-green-300 focus:ring-green-500' 
                  : 'border-blue-300 focus:ring-blue-500'
              }`}
            />
            <p className={`text-xs mt-1 ${isHumanMode ? 'text-green-600' : 'text-blue-600'}`}>
              {isHumanMode ? '👤 Replying as Human/Employee' : '🤖 Replying as Bot'}
            </p>
          </div>
          <button
            onClick={handleSendReply}
            disabled={!reply.trim() || sending}
            className={`rounded-lg p-2 transition-colors text-white disabled:bg-gray-300 flex-shrink-0 ${
              isHumanMode 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
            title={isHumanMode ? 'Send as Human' : 'Send as Bot'}
          >
            {sending ? <Loader className="animate-spin" size={20} /> : <Send size={20} />}
          </button>
        </div>
      </div>
    </div>
  )
}
