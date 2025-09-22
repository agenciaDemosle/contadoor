import { Link } from 'react-router-dom';
import { trackButtonClick, trackCTAClick, trackExternalLink } from '../lib/gtm';

export default function Button({
  to,
  href,
  onClick,
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
  trackingName = null,
  trackingSection = 'unknown',
  trackingPosition = null,
  ...props
}) {
  const baseClasses = 'inline-block px-6 py-3 rounded-button font-semibold transition-all duration-240';
  
  const variants = {
    primary: 'bg-black text-white hover:shadow-lg',
    secondary: 'bg-white text-black border-2 border-black hover:bg-gray-50',
    outline: 'bg-transparent text-black border-2 border-black hover:bg-black hover:text-white',
  };

  const classes = `${baseClasses} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  // Función para manejar el tracking
  const handleTracking = () => {
    if (disabled) return;
    
    const buttonText = typeof children === 'string' ? children : trackingName || 'Button';
    
    if (to) {
      // Link interno
      trackCTAClick(buttonText, trackingPosition || 'internal', trackingSection, to);
    } else if (href) {
      // Link externo  
      trackExternalLink(href, buttonText, trackingSection);
    } else {
      // Botón regular
      trackButtonClick(buttonText, trackingSection, { variant });
    }
  };

  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        onClick={handleTracking}
        {...props}
      >
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleTracking}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={(e) => {
        handleTracking();
        if (onClick) onClick(e);
      }}
      className={classes}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}