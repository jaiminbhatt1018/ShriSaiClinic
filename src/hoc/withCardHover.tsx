import React from 'react';
import { motion } from 'motion/react';

/**
 * Higher-Order Component (HOC) to add smooth motion elevation,
 * subtle border highlight, and soft shadow transitions to cards.
 */
export function withCardHover<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options?: { liftPx?: number }
) {
  const WithCardHoverComponent: React.FC<P & { className?: string }> = ({ className = '', ...props }) => {
    const lift = options?.liftPx ?? -4;

    return (
      <motion.div
        className={`h-full ${className}`}
        whileHover={{ y: lift }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      >
        <WrappedComponent {...(props as P)} />
      </motion.div>
    );
  };

  WithCardHoverComponent.displayName = `withCardHover(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return WithCardHoverComponent;
}
