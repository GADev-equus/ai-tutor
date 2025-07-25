/**
 * ChatInput component for sending messages
 */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useUserPreferences } from '../context/UserPreferencesContext';

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const { preferences } = useUserPreferences();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      // Add response type preference if not set to auto
      const messageWithPreference =
        preferences.responseType !== 'auto'
          ? `[${preferences.responseType}] ${message}`
          : message;

      onSendMessage(messageWithPreference);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Ask about biology concepts..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!message.trim() || isLoading}
        >
          {isLoading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Sending...
            </>
          ) : (
            'Send'
          )}
        </button>
      </div>
      <div className="form-text mt-2">
        <small className="text-muted">
          Try: "Explain photosynthesis" or "What is DNA replication?"
        </small>
      </div>
    </form>
  );
};

ChatInput.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

ChatInput.defaultProps = {
  isLoading: false,
};

export default ChatInput;
