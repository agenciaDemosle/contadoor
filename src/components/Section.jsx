export default function Section({ children, className = "", background = "white" }) {
  const backgrounds = {
    white: "bg-white",
    gray: "bg-gray-50",
    primary: "bg-primary text-white",
    black: "bg-black text-white",
  };

  return (
    <section className={`py-16 md:py-24 ${backgrounds[background]} ${className}`}>
      {children}
    </section>
  );
}