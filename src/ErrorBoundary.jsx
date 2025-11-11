import { Component } from "react";
import { Link } from "@tanstack/react-router";


class ErrorBoundary extends Component {
    state = {hasError: false};
    static getDerivedStateFromError() {
        return {hasError: true};
}
    componentDidCatch(error, info) {
        // send trackJS or Sentry error reports here
        console.error("ErrorBoundary caught an error", error, info);
    }
    componentDidMount() {}
    render() {
        if (this.state.hasError) {
            return (<div className="error-boundary">
                <h2>Uh oh!</h2>
                <p>there was an error with this page
                    <Link to={"/"}> Click Here</Link> to go back to Home page.
                </p>
            </div> 

            )
        }
    return this.props.children;
    }
        
}

export default ErrorBoundary;