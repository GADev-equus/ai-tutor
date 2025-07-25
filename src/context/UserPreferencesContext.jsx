/**
 * UserPreferencesContext for managing user preferences across the application
 */
import { createContext, useState, useContext, useEffect } from 'react';

// Default preferences
const DEFAULT_PREFERENCES = {
  fontSize: 'medium', // small, medium, large
  responseType: 'auto', // auto, teaching, factual
  useExamples: true,
  markdownEnabled: true,
};

// Create the context
const UserPreferencesContext = createContext();

// Custom hook for using the preferences context
export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error(
      'useUserPreferences must be used within a UserPreferencesProvider',
    );
  }
  return context;
};

// Preferences provider component
export const UserPreferencesProvider = ({ children }) => {
  // Load preferences from localStorage or use defaults
  const loadSavedPreferences = () => {
    const savedPrefs = localStorage.getItem('userPreferences');
    return savedPrefs ? JSON.parse(savedPrefs) : DEFAULT_PREFERENCES;
  };

  const [preferences, setPreferences] = useState(loadSavedPreferences);

  // Update a single preference
  const updatePreference = (key, value) => {
    setPreferences((prev) => {
      const updated = { ...prev, [key]: value };
      localStorage.setItem('userPreferences', JSON.stringify(updated));
      return updated;
    });
  };

  // Reset preferences to defaults
  const resetPreferences = () => {
    setPreferences(DEFAULT_PREFERENCES);
    localStorage.setItem(
      'userPreferences',
      JSON.stringify(DEFAULT_PREFERENCES),
    );
  };

  // Apply font size preference to body
  useEffect(() => {
    const fontSizes = {
      small: '0.9rem',
      medium: '1rem',
      large: '1.1rem',
    };
    document.body.style.fontSize =
      fontSizes[preferences.fontSize] || fontSizes.medium;
  }, [preferences.fontSize]);

  // The value object passed to the provider
  const value = {
    preferences,
    updatePreference,
    resetPreferences,
  };

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  );
};
