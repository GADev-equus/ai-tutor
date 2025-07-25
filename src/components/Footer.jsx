/**
 * Footer component for the Biology Tutor application
 */
import ApiStatus from './ApiStatus';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h5>LangGraph Biology Tutor</h5>
            <p className="text-muted">
              Powered by LangGraph, OpenAI, and retrieval-augmented generation.
            </p>
          </div>
          <div className="col-lg-3">
            <h6 className="mb-3">Learning Resources</h6>
            <ul className="list-unstyled">
              <li>
                <a
                  href="https://js.langchain.com/docs/modules/langgraph"
                  target="_blank"
                  rel="noreferrer"
                  className="text-light"
                >
                  LangGraph.js
                </a>
              </li>
              <li>
                <a
                  href="https://smith.langchain.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-light"
                >
                  LangSmith
                </a>
              </li>
              <li>
                <a
                  href="https://js.langchain.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-light"
                >
                  LangChain.js
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3">
            <h6 className="mb-3">Project Links</h6>
            <ul className="list-unstyled">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-light"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://docs.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-light"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/issues"
                  target="_blank"
                  rel="noreferrer"
                  className="text-light"
                >
                  Issue Tracker
                </a>
              </li>
            </ul>
          </div>
        </div>{' '}
        <hr className="my-4" />
        <div className="d-flex justify-content-between align-items-center text-muted">
          <small>
            &copy; {currentYear} LangGraph Biology Tutor. All rights reserved.
          </small>
          <ApiStatus />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
