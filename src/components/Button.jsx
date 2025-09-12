import { Link } from 'react-router-dom';

export default function Button({ 
  to, 
  href, 
  onClick, 
  children, 
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false 
}) {
  const baseClasses = 'inline-block px-6 py-3 rounded-button font-semibold transition-all duration-240';
  
  const variants = {
    primary: 'bg-black text-white hover:shadow-lg',
    secondary: 'bg-white text-black border-2 border-black hover:bg-gray-50',
    outline: 'bg-transparent text-black border-2 border-black hover:bg-black hover:text-white',
  };

  const classes = `${baseClasses} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button 
      type={type}
      onClick={onClick} 
      className={classes}
      disabled={disabled}
    >
      {children}
    </button>
  );
}