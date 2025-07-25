/**
 * ChatSettings component for user preferences in the chat interface
 */
import { useState } from 'react';
import { useUserPreferences } from '../context/UserPreferencesContext';
import PropTypes from 'prop-types';

// Default preferences (duplicated from context for reset functionality)
const DEFAULT_PREFERENCES = {
  fontSize: 'medium', // small, medium, large
  responseType: 'auto', // auto, teaching, factual
  useExamples: true,
  markdownEnabled: true,
};

const ChatSettings = ({ onClose }) => {
  const { preferences, updatePreference, resetPreferences } =
    useUserPreferences();
  const [localPrefs, setLocalPrefs] = useState({ ...preferences });

  const handleChange = (key, value) => {
    setLocalPrefs((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Update all preferences at once
    Object.entries(localPrefs).forEach(([key, value]) => {
      updatePreference(key, value);
    });
    onClose();
  };

  const handleReset = () => {
    resetPreferences();
    setLocalPrefs({ ...DEFAULT_PREFERENCES });
  };

  return (
    <div className="card">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 className="m-0">Chat Settings</h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          onClick={onClose}
          aria-label="Close"
        ></button>
      </div>

      <div className="card-body">
        <form>
          <div className="mb-3">
            <label htmlFor="fontSize" className="form-label">
              Text Size
            </label>
            <select
              id="fontSize"
              className="form-select"
              value={localPrefs.fontSize}
              onChange={(e) => handleChange('fontSize', e.target.value)}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="responseType" className="form-label">
              Preferred Response Type
            </label>
            <select
              id="responseType"
              className="form-select"
              value={localPrefs.responseType}
              onChange={(e) => handleChange('responseType', e.target.value)}
            >
              <option value="auto">Automatic (Let AI decide)</option>
              <option value="teaching">Teaching Style</option>
              <option value="factual">Factual Information</option>
            </select>
            <small className="form-text text-muted">
              This preference will be sent with your queries to guide the AI's
              response style.
            </small>
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="useExamples"
              checked={localPrefs.useExamples}
              onChange={(e) => handleChange('useExamples', e.target.checked)}
            />
            <label className="form-check-label" htmlFor="useExamples">
              Include examples in responses
            </label>
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="markdownEnabled"
              checked={localPrefs.markdownEnabled}
              onChange={(e) =>
                handleChange('markdownEnabled', e.target.checked)
              }
            />
            <label className="form-check-label" htmlFor="markdownEnabled">
              Enable markdown formatting
            </label>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleReset}
            >
              Reset to Defaults
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Save Preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ChatSettings.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ChatSettings;
