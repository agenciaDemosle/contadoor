export default function Card({ children, className = "", hover = false, variant = "default" }) {
  const variants = {
    default: "bg-white shadow-soft",
    glass: "bg-white/10 backdrop-blur-md border border-white/20",
    gradient: "bg-gradient-to-br from-primary-50 to-primary-100",
    elevated: "bg-white shadow-xl"
  };

  return (
    <div 
      className={`
        rounded-2xl p-6 
        ${variants[variant]}
        ${hover ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}