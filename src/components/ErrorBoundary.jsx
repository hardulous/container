import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error("Error caught by error boundary:", error, errorInfo);
    // You can also set a state to render a fallback UI
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // Render a fallback UI
      return (
        <div>
          <h2>Something went wrong!</h2>
          <p>Please try again later.</p>
        </div>
      );
    }

    // If no error occurred, render the children components
    return this.props.children;
  }
}

export default ErrorBoundary;
