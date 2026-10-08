import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

export const RouteErrorBoundary: React.FC = () => {
  const error = useRouteError();

  let errorMessage = 'An unexpected medical portal error occurred.';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorMessage = error.statusText || error.data?.message || errorMessage;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 text-slate-800">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-slate-200 text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200">
            Error {errorStatus}
          </span>
          <h2 className="font-heading font-extrabold text-2xl text-slate-900 mt-3">
            Portal Navigation Notice
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            {errorMessage}
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl btn-primary text-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reload Portal</span>
          </button>
          <a
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl btn-secondary text-xs flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </a>
        </div>
      </div>
    </div>
  );
};
