/**
 * Model Context Protocol (MPC) implementation for retrieving the latest documents
 */

/**
 * Class for interacting with document context using Model Context Protocol pattern
 */
export default class ModelContextProtocol {
  constructor(apiClient) {
    this.apiClient = apiClient;
    this.documents = [];
    this.latestContext = {};
  }
  /**
   * Retrieve relevant documents based on a query
   *
   * @param {string} query - The user query to find relevant documents
   * @returns {Promise<Array>} - List of relevant documents
   */
  async getRelevantDocuments(query) {
    try {
      // Log the request to help with debugging
      console.log('Retrieving documents for query:', query);
      console.log('API client base URL:', this.apiClient.defaults.baseURL);

      // Call the document retrieval endpoint
      const response = await this.apiClient.post('/retrieve', { query });
      console.log('Document retrieval response:', response.data);

      this.documents = response.data.documents || [];
      return this.documents;
    } catch (error) {
      console.error('Error retrieving documents:', error);
      console.error('Error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      // Return an empty array to prevent UI errors
      return [];
    }
  }

  /**
   * Get the latest context from the conversation
   *
   * @returns {Object} The latest context
   */
  getLatestContext() {
    return this.latestContext;
  }

  /**
   * Update the context with new information
   *
   * @param {Object} newContext - New context information
   */
  updateContext(newContext) {
    this.latestContext = {
      ...this.latestContext,
      ...newContext,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Clear all context
   */
  clearContext() {
    this.latestContext = {};
    this.documents = [];
  }
}

// No need to export here since we're already using 'export default class' above
