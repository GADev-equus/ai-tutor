/**
 * ChatInterface component that combines ChatMessage and ChatInput
 */
import { useRef, useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ChatSettings from './ChatSettings';
import { useChat } from '../context/ChatContext';
import { useUserPreferences } from '../context/UserPreferencesContext';

const ChatInterface = () => {
  const {
    messages,
    loading,
    sendMessage,
    clearChat,
    threadId,
    relevantDocs,
    error,
  } = useChat();
  const { preferences } = useUserPreferences();
  const chatContainerRef = useRef(null);
  const [showContext, setShowContext] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [summarizing, setSummarizing] = useState(false);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  // Initialize tooltips from Bootstrap
  useEffect(() => {
    // Check if bootstrap is loaded
    const initTooltips = () => {
      try {
        // Skip initialization if bootstrap isn't available
        if (typeof bootstrap === 'undefined') {
          console.warn(
            'Bootstrap not available yet, skipping tooltip initialization',
          );
          return;
        }

        // Initialize all tooltips
        const tooltipTriggerList = document.querySelectorAll(
          '[data-bs-toggle="tooltip"]',
        );
        Array.from(tooltipTriggerList).forEach((tooltipTriggerEl) => {
          new bootstrap.Tooltip(tooltipTriggerEl);
        });
      } catch (error) {
        console.warn('Bootstrap tooltip initialization failed:', error);
      }
    };

    // Initialize tooltips with a small delay to ensure Bootstrap is loaded
    const timeoutId = setTimeout(initTooltips, 300);

    // Clean up tooltips when component unmounts
    return () => {
      clearTimeout(timeoutId);
      try {
        if (typeof bootstrap !== 'undefined') {
          const tooltipTriggerList = document.querySelectorAll(
            '[data-bs-toggle="tooltip"]',
          );
          Array.from(tooltipTriggerList).forEach((tooltipTriggerEl) => {
            const tooltip = bootstrap.Tooltip.getInstance(tooltipTriggerEl);
            if (tooltip) {
              tooltip.dispose();
            }
          });
        }
      } catch (error) {
        console.warn('Bootstrap tooltip cleanup failed:', error);
      }
    };
  }, []);
  // Function to trigger conversation summary
  const handleSummarizeConversation = () => {
    if (messages.length < 2 || loading || summarizing) return; // Need at least one exchange
    setSummarizing(true);

    // Create system notification message
    const systemMessage = {
      id: Date.now().toString(),
      role: 'system',
      content: 'Generating a summary of your conversation...',
      metadata: { isNotification: true },
      timestamp: new Date().toISOString(),
    };

    // Send the actual summarize command - we use a hidden command that the API recognizes
    // We pass addToChat: false to prevent adding "summarize our conversation" to the chat history
    sendMessage('summarize our conversation', {
      addToChat: false,
      systemMessages: [systemMessage],
    })
      .catch((error) => {
        console.error('Error generating summary:', error);
        setError('Failed to generate summary. Please try again.');
      })
      .finally(() => {
        setSummarizing(false);
      });
  };

  return (
    <div className="chat-interface card border-0 shadow">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        {' '}
        <div className="d-flex align-items-center">
          <h5 className="m-0">Biology Tutor Chat</h5>
          {threadId && (
            <span className="badge bg-light text-primary ms-2">
              <small>ID: {threadId.substring(0, 8)}...</small>
            </span>
          )}
        </div>
        <div>
          <button
            className="btn btn-sm btn-outline-light me-2"
            onClick={() => setShowSettings(true)}
            title="Chat Settings"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-gear"
              viewBox="0 0 16 16"
            >
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
            </svg>
          </button>{' '}
          <button
            className="btn btn-sm btn-outline-light me-2"
            onClick={() => setShowContext(!showContext)}
            disabled={relevantDocs.length === 0}
            title={
              showContext ? 'Hide context documents' : 'Show context documents'
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-book"
              viewBox="0 0 16 16"
            >
              <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
            </svg>
          </button>{' '}
          <button
            className="btn btn-sm btn-outline-light me-2"
            onClick={handleSummarizeConversation}
            disabled={loading || messages.length < 2 || summarizing}
            title="Generate a summary of your conversation"
            aria-label="Summarize conversation"
          >
            {summarizing ? (
              <span className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Summarizing...</span>
              </span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-list-ul"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                />
              </svg>
            )}
          </button>
          <button
            className="btn btn-sm btn-outline-light"
            onClick={clearChat}
            disabled={loading || messages.length === 0}
            title="Start a new conversation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
          </button>
        </div>
      </div>
      <div className="card-body p-0">
        {/* Settings Modal - shown when settings button is clicked */}
        {showSettings && (
          <div
            className="settings-overlay position-absolute w-100 h-100 p-4"
            style={{ zIndex: 1050, background: 'rgba(0,0,0,0.5)' }}
          >
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
                <ChatSettings onClose={() => setShowSettings(false)} />
              </div>
            </div>
          </div>
        )}

        {/* Context Information - only shown when toggled */}
        {showContext && relevantDocs.length > 0 && (
          <div className="p-3 bg-light border-bottom">
            <h6 className="mb-2">Reference Materials</h6>
            <div
              className="small"
              style={{ maxHeight: '150px', overflowY: 'auto' }}
            >
              {relevantDocs.map((doc, index) => (
                <div key={index} className="mb-2 p-2 border rounded">
                  <div className="fw-bold">
                    {doc.title || `Reference ${index + 1}`}
                  </div>
                  <div className="text-muted">
                    {doc.source || 'Biology textbook'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Error Alert */}
        {error && <div className="alert alert-danger m-3">{error}</div>}

        {/* Chat Messages */}
        <div className="chat-container p-3" ref={chatContainerRef}>
          {messages.length === 0 ? (
            <div className="text-center text-muted py-5">
              <div className="mb-3">👋</div>
              <h4>Welcome to Biology Tutor!</h4>
              <p>
                Ask me any question about biology or A-level topics.
                <br />I can provide teaching or factual information.
              </p>
              <p className="mt-4 small">
                <i className="bi bi-lightbulb"></i> Tip: Use the{' '}
                <i className="bi bi-list-ul"></i> button to get a summary of
                your conversation.
              </p>
            </div>
          ) : (
            messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))
          )}

          {loading && (
            <div className="text-center my-3">
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted mt-2">The tutor is thinking...</p>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-3 border-top">
          <ChatInput onSendMessage={sendMessage} isLoading={loading} />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
