/**
 * ChatPage component for the chat interface
 */
import ChatInterface from '../components/ChatInterface';
import { useState } from 'react';

const ChatPage = () => {
  const [expandedTip, setExpandedTip] = useState(null);

  const toggleTip = (tipName) => {
    if (expandedTip === tipName) {
      setExpandedTip(null);
    } else {
      setExpandedTip(tipName);
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-lg-11">
          <h1 className="text-center mb-4">Biology AI Tutor</h1>

          <div className="row g-4">
            {/* Main chat area */}
            <div className="col-lg-8 order-lg-2">
              <ChatInterface />
            </div>

            {/* Side panel with tips */}
            <div className="col-lg-4 order-lg-1">
              <div className="sticky-top" style={{ top: '20px' }}>
                {/* Help accordion */}
                <div className="card shadow-sm mb-4 border-0 rounded-3">
                  <div className="card-header bg-primary text-white py-3">
                    <h5 className="card-title mb-0">Chat Guide</h5>
                  </div>
                  <div className="card-body p-0">
                    <div className="accordion" id="chatTipsAccordion">
                      {/* Teaching Responses Panel */}
                      <div className="accordion-item border-0">
                        <h2 className="accordion-header">
                          <button
                            className={`accordion-button ${
                              expandedTip === 'teaching' ? '' : 'collapsed'
                            }`}
                            type="button"
                            onClick={() => toggleTip('teaching')}
                          >
                            <i className="bi bi-mortarboard me-2"></i> Teaching
                            Responses
                          </button>
                        </h2>
                        <div
                          className={`accordion-collapse collapse ${
                            expandedTip === 'teaching' ? 'show' : ''
                          }`}
                        >
                          <div className="accordion-body">
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item border-0 ps-0 py-1">
                                "Explain photosynthesis"
                              </li>
                              <li className="list-group-item border-0 ps-0 py-1">
                                "Help me understand DNA replication"
                              </li>
                              <li className="list-group-item border-0 ps-0 py-1">
                                "Teach me about cell division"
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Information Responses Panel */}
                      <div className="accordion-item border-0">
                        <h2 className="accordion-header">
                          <button
                            className={`accordion-button ${
                              expandedTip === 'information' ? '' : 'collapsed'
                            }`}
                            type="button"
                            onClick={() => toggleTip('information')}
                          >
                            <i className="bi bi-info-circle me-2"></i>{' '}
                            Information Responses
                          </button>
                        </h2>
                        <div
                          className={`accordion-collapse collapse ${
                            expandedTip === 'information' ? 'show' : ''
                          }`}
                        >
                          <div className="accordion-body">
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item border-0 ps-0 py-1">
                                "What is photosynthesis?"
                              </li>
                              <li className="list-group-item border-0 ps-0 py-1">
                                "Define mitochondria"
                              </li>
                              <li className="list-group-item border-0 ps-0 py-1">
                                "List the stages of meiosis"
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Exam Questions Panel */}
                      <div className="accordion-item border-0">
                        <h2 className="accordion-header">
                          <button
                            className={`accordion-button ${
                              expandedTip === 'examQuestions' ? '' : 'collapsed'
                            }`}
                            type="button"
                            onClick={() => toggleTip('examQuestions')}
                          >
                            <i className="bi bi-card-text me-2"></i> Exam
                            Questions
                          </button>
                        </h2>
                        <div
                          className={`accordion-collapse collapse ${
                            expandedTip === 'examQuestions' ? 'show' : ''
                          }`}
                        >
                          <div className="accordion-body">
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item border-0 ps-0 py-1">
                                "Show me exam questions about enzymes"
                              </li>
                              <li className="list-group-item border-0 ps-0 py-1">
                                "Find exam questions on natural selection"
                              </li>
                              <li className="list-group-item border-0 ps-0 py-1">
                                "Get exam paper questions about respiration"
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Mark Schemes Panel */}
                      <div className="accordion-item border-0">
                        <h2 className="accordion-header">
                          <button
                            className={`accordion-button ${
                              expandedTip === 'markSchemes' ? '' : 'collapsed'
                            }`}
                            type="button"
                            onClick={() => toggleTip('markSchemes')}
                          >
                            <i className="bi bi-check-square me-2"></i> Mark
                            Schemes
                          </button>
                        </h2>
                        <div
                          className={`accordion-collapse collapse ${
                            expandedTip === 'markSchemes' ? 'show' : ''
                          }`}
                        >
                          <div className="accordion-body">
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item border-0 ps-0 py-1">
                                "What's the mark scheme for photosynthesis?"
                              </li>
                              <li className="list-group-item border-0 ps-0 py-1">
                                "Show marking criteria for DNA replication"
                              </li>
                              <li className="list-group-item border-0 ps-0 py-1">
                                "How are questions about homeostasis marked?"
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Advanced Topics Panel */}
                      <div className="accordion-item border-0">
                        <h2 className="accordion-header">
                          <button
                            className={`accordion-button ${
                              expandedTip === 'advanced' ? '' : 'collapsed'
                            }`}
                            type="button"
                            onClick={() => toggleTip('advanced')}
                          >
                            <i className="bi bi-graph-up me-2"></i> Advanced
                            Topics
                          </button>
                        </h2>
                        <div
                          className={`accordion-collapse collapse ${
                            expandedTip === 'advanced' ? 'show' : ''
                          }`}
                        >
                          <div className="accordion-body">
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item border-0 ps-0 py-1">
                                "Compare photosynthesis and cellular
                                respiration"
                              </li>
                              <li className="list-group-item border-0 ps-0 py-1">
                                "How do enzymes lower activation energy?"
                              </li>
                              <li className="list-group-item border-0 ps-0 py-1">
                                "Explain Hardy-Weinberg equilibrium"
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Exam Preparation Card */}
                <div className="card shadow-sm border-0 rounded-3">
                  <div className="card-header bg-success text-white py-3">
                    <h5 className="card-title mb-0">Exam Preparation</h5>
                  </div>
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-light p-2 rounded-circle me-3">
                        <i className="bi bi-journal-check fs-4 text-success"></i>
                      </div>
                      <div>
                        <h6 className="mb-0">Past Exam Questions</h6>
                        <small className="text-muted">
                          Real questions from previous papers
                        </small>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-light p-2 rounded-circle me-3">
                        <i className="bi bi-clipboard-check fs-4 text-success"></i>
                      </div>
                      <div>
                        <h6 className="mb-0">Mark Schemes</h6>
                        <small className="text-muted">
                          Learn what examiners look for
                        </small>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-light p-2 rounded-circle me-3">
                        <i className="bi bi-patch-question fs-4 text-success"></i>
                      </div>
                      <div>
                        <h6 className="mb-0">Practice Quizzes</h6>
                        <small className="text-muted">
                          Test your knowledge
                        </small>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="bg-light p-2 rounded-circle me-3">
                        <i className="bi bi-lightbulb fs-4 text-success"></i>
                      </div>
                      <div>
                        <h6 className="mb-0">Exam Techniques</h6>
                        <small className="text-muted">
                          Guidance on answering approaches
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
