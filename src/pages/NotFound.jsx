import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-container-max mx-auto px-margin-mobile py-32 text-center">
      <p className="text-label-caps uppercase text-secondary mb-3">404</p>
      <h1 className="font-display text-display-lg-mobile md:text-display-lg">Page Not Found</h1>
      <p className="font-body text-body-md text-on-surface-variant mt-4">
        The page you're looking for has moved or no longer exists.
      </p>
      <Link to="/" className="inline-block mt-8 text-label-caps uppercase border-b border-on-surface pb-1">
        Return Home
      </Link>
    </div>
  );
}
