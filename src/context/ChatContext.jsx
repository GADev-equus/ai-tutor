/**
 * ChatContext for managing chat state across the application
 */
import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import { api, sendChatMessage } from '../services/api';
import ModelContextProtocol from '../services/modelContextProtocol';

// Create the context
const ChatContext = createContext();

// Initialize the Model Context Protocol
const mcp = new ModelContextProtocol(api);

// Custom hook for using the chat context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

// Chat provider component
export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [threadId, setThreadId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [relevantDocs, setRelevantDocs] = useState([]);
  // Function to get relevant documents using MCP
  const getRelevantDocuments = useCallback(async (query) => {
    try {
      const docs = await mcp.getRelevantDocuments(query);
      setRelevantDocs(docs);
      return docs;
    } catch (err) {
      console.error('Error getting relevant documents:', err);
      return [];
    }
  }, []); // Function to send a message to the API
  const sendMessage = useCallback(
    async (messageText, options = {}) => {
      const { addToChat = true, systemMessages = [] } = options;
      setLoading(true);
      setError(null);

      try {
        // Add custom system messages if provided (for notifications, etc.)
        if (systemMessages && systemMessages.length > 0) {
          // Make sure each system message has a timestamp
          const timestampedSystemMessages = systemMessages.map((msg) => ({
            ...msg,
            timestamp: msg.timestamp || new Date().toISOString(),
          }));
          setMessages((prevMessages) => [
            ...prevMessages,
            ...timestampedSystemMessages,
          ]);
        }
        // Add user message to the chat if addToChat is true
        if (addToChat) {
          const userMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: messageText,
            timestamp: new Date().toISOString(),
          };

          setMessages((prevMessages) => [...prevMessages, userMessage]);
        }

        // Get relevant documents using MCP (in the background)
        getRelevantDocuments(messageText).catch(console.error);

        // Update MCP context
        mcp.updateContext({ lastQuery: messageText });

        // Call the API
        const response = await sendChatMessage(messageText, threadId);

        // Save the thread ID for conversation continuity
        if (response.thread_id) {
          setThreadId(response.thread_id);
        } // Add AI response to the chat
        const aiMessage = {
          id: Date.now().toString(),
          role: 'ai',
          content: response.reply,
          responseType: response.responseType || 'unknown',
          timestamp: new Date().toISOString(),
        };

        // Update MCP context with response information
        mcp.updateContext({
          lastResponse: response.reply,
          responseType: response.responseType,
        });

        setMessages((prevMessages) => [...prevMessages, aiMessage]);
        return response;
      } catch (err) {
        setError('Failed to send message. Please try again.');
        console.error('Error in sendMessage:', err);
        throw err; // Re-throw the error so it can be caught by the caller
      } finally {
        setLoading(false);
      }
    },
    [threadId, getRelevantDocuments],
  );
  // Function to clear the conversation
  const clearChat = useCallback(() => {
    setMessages([]);
    setThreadId(null);
    setError(null);
    setRelevantDocs([]);
    mcp.clearContext(); // Also clear the MCP context
  }, []);

  // Initialize chat with a topic if provided in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const topicParam = params.get('topic');

    if (topicParam && messages.length === 0) {
      sendMessage(`I'd like to learn about ${topicParam}`);
    }
  }, [messages.length, sendMessage]);

  // The value object passed to the provider
  const value = {
    messages,
    loading,
    error,
    threadId,
    relevantDocs,
    sendMessage,
    clearChat,
    mcp, // Expose the MCP instance for advanced usage
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContext;
