/**
 * HomePage component for the landing page
 */
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container">
      {' '}
      {/* Hero Section */}
      <section className="py-5">
        <div className="row py-lg-5 align-items-center">
          <div className="col-lg-6 col-md-12 text-center text-lg-start">
            <h1 className="fw-bold">Biology Tutor with LangGraph</h1>
            <p className="lead text-muted">
              {' '}
              An AI-powered tutoring system specialized in A-Level biology
              topics, leveraging LangGraph, Pinecone vector search, and
              educational frameworks.
            </p>
            <div className="mt-4">
              <Link to="/chat" className="btn btn-primary btn-lg me-2">
                Start Learning
              </Link>
              <Link to="/about" className="btn btn-outline-secondary btn-lg">
                Learn More
              </Link>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 mt-4 mt-lg-0 text-center">
            <img
              src="/biology-illustration.svg"
              alt="Biology Learning Illustration"
              className="img-fluid"
              style={{ maxHeight: '400px' }}
            />
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="card-title h5 fw-bold">
                  Bloom's Taxonomy Learning
                </h3>
                <p className="card-text">
                  Structured educational responses following Bloom's Taxonomy to
                  promote comprehensive understanding from remembering to
                  creating.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="card-title h5 fw-bold">
                  A-Level Curriculum Focus
                </h3>
                <p className="card-text">
                  Content specifically tailored to A-Level biology with textbook
                  references, perfect for examination preparation.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="card-title h5 fw-bold">Dual Response Modes</h3>
                <p className="card-text">
                  Ask for factual information or comprehensive teaching
                  explanations based on your specific learning needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="py-5">
        <h2 className="text-center mb-5">How It Works</h2>
        <div className="row">
          <div className="col-md-4 text-center">
            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-4"
              style={{ width: '100px', height: '100px' }}
            >
              <h3 className="m-0">1</h3>
            </div>
            <h4>Ask a Question</h4>
            <p>
              Type any biology-related question or topic you want to learn
              about.
            </p>
          </div>
          <div className="col-md-4 text-center">
            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-4"
              style={{ width: '100px', height: '100px' }}
            >
              <h3 className="m-0">2</h3>
            </div>
            <h4>AI Analysis</h4>
            <p>
              The system analyzes your question, retrieves relevant information,
              and determines your learning needs.
            </p>
          </div>
          <div className="col-md-4 text-center">
            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-4"
              style={{ width: '100px', height: '100px' }}
            >
              <h3 className="m-0">3</h3>
            </div>
            <h4>Tailored Response</h4>
            <p>
              Receive either factual information with textbook references or
              structured educational content.
            </p>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-5 text-center bg-light rounded-3 my-5">
        <div className="py-5">
          <h2 className="fw-bold">Ready to master biology concepts?</h2>
          <p className="lead">
            Start a conversation with our AI tutor and enhance your A-Level
            biology knowledge.
          </p>
          <Link to="/chat" className="btn btn-primary btn-lg mt-3">
            Start Learning Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
