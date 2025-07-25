/**
 * ChatMessage component for rendering individual messages
 */
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { useUserPreferences } from '../context/UserPreferencesContext';

const ChatMessage = ({ message }) => {
  // Get user preferences
  const { preferences } = useUserPreferences();

  // Determine if the message is from the AI or user
  const isAi = message.role === 'ai';
  const isSystem = message.role === 'system';
  const isNotification = isSystem && message.metadata?.isNotification;

  // Format the timestamp
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  // If it's a system notification, render a special centered notification message
  if (isNotification) {
    return (
      <div className="d-flex justify-content-center mb-3">
        <div
          className="message-system p-2 rounded-pill bg-light text-muted shadow-sm"
          style={{ maxWidth: '80%', fontSize: '0.9rem' }}
        >
          <div className="d-flex align-items-center">
            <i className="bi bi-info-circle me-2"></i>
            <span>{message.content}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`d-flex ${
        isAi ? 'justify-content-start' : 'justify-content-end'
      } mb-3`}
    >
      <div
        className={`message p-3 rounded shadow-sm ${
          isAi ? 'message-ai' : 'message-user'
        } ${
          isAi && message.responseType === 'examQuestion'
            ? 'message-exam-question'
            : ''
        } ${
          isAi && message.responseType === 'markScheme'
            ? 'message-mark-scheme'
            : ''
        } ${
          isAi && message.responseType === 'summary' ? 'message-summary' : ''
        }`}
        style={{ maxWidth: '80%' }}
      >
        {/* Message header with role and response type for AI */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="fw-bold">
            {isAi ? 'Biology Tutor' : 'You'}
            {isAi && message.responseType && (
              <span className="badge bg-secondary ms-2 text-lowercase">
                {message.responseType === 'information'
                  ? 'Information'
                  : message.responseType === 'teaching'
                  ? 'Teaching'
                  : message.responseType === 'examQuestion'
                  ? 'Exam Question'
                  : message.responseType === 'markScheme'
                  ? 'Mark Scheme'
                  : message.responseType === 'summary'
                  ? 'Summary'
                  : message.responseType}
              </span>
            )}
          </span>
          <small className="text-muted">{formattedTime}</small>
        </div>
        {/* Message content with Markdown rendering for AI responses (if enabled) */}
        <div className="mt-2">
          {' '}
          {isAi ? (
            preferences.markdownEnabled ? (
              <div className="markdown-content">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            ) : (
              <p className="m-0">{message.content}</p>
            )
          ) : (
            <p className="m-0">{message.content}</p>
          )}
        </div>
      </div>
    </div>
  );
};

ChatMessage.propTypes = {
  message: PropTypes.shape({
    role: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    responseType: PropTypes.string,
    metadata: PropTypes.object,
  }).isRequired,
};

export default ChatMessage;
