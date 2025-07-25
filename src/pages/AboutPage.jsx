/**
 * AboutPage component
 */
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h1 className="fw-bold mb-4">About Biology Tutor</h1>

          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h2 className="h4 fw-bold">Our Mission</h2>
              <p>
                The Biology Tutor is designed to provide personalized,
                education-focused assistance to A-Level biology students. Using
                advanced AI techniques and educational frameworks, we aim to
                make complex biological concepts accessible and engaging.
              </p>
            </div>
          </div>

          <h3 className="h4 fw-bold mb-3">Technology Stack</h3>
          <div className="row row-cols-1 row-cols-md-2 g-4 mb-5">
            <div className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h4 className="h5 card-title">LangGraph Framework</h4>
                  <p className="card-text">
                    Our application uses LangGraph.js to create a sophisticated
                    conversational flow with multiple specialized nodes for
                    different types of responses.
                  </p>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card h-100 shadow-sm">
                {' '}
                <div className="card-body">
                  <h4 className="h5 card-title">Pinecone Vector Search</h4>
                  <p className="card-text">
                    Semantically searches through A-Level biology textbooks to
                    find the most relevant information for your queries.
                  </p>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h4 className="h5 card-title">SQLite Persistence</h4>
                  <p className="card-text">
                    Conversations are stored in SQLite, allowing you to continue
                    learning sessions across multiple visits.
                  </p>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h4 className="h5 card-title">LangSmith Monitoring</h4>
                  <p className="card-text">
                    Integrated LangSmith tracing and monitoring helps us
                    continuously improve the quality and accuracy of responses.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h3 className="h4 fw-bold mb-3">Educational Approach</h3>
          <div className="card shadow-sm mb-5">
            <div className="card-body">
              <h4 className="h5">Bloom's Taxonomy</h4>
              <p>
                When you ask for explanations or conceptual understanding, our
                tutor structures responses according to Bloom's Taxonomy:
              </p>

              <ol className="list-group list-group-numbered mb-4">
                <li className="list-group-item">
                  <strong>Remembering:</strong> Key facts and definitions
                </li>
                <li className="list-group-item">
                  <strong>Understanding:</strong> Explaining concepts in
                  accessible language
                </li>
                <li className="list-group-item">
                  <strong>Applying:</strong> Real-world applications and
                  examples
                </li>
                <li className="list-group-item">
                  <strong>Analyzing:</strong> Breaking down concepts into
                  components
                </li>
                <li className="list-group-item">
                  <strong>Evaluating:</strong> Discussing significance and
                  implications
                </li>
                <li className="list-group-item">
                  <strong>Creating:</strong> Suggesting further exploration and
                  problem-solving
                </li>
              </ol>

              <h4 className="h5 mt-4">Information Mode</h4>
              <p>
                For factual questions, we provide concise information with
                direct references to A-Level biology textbooks, helping you
                quickly find relevant content for study and revision.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link to="/chat" className="btn btn-primary btn-lg">
              Start Learning with Biology Tutor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
