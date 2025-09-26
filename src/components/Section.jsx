export default function Section({
  children,
  className = "",
  background = "white",
  id,
  sectionName,
  ...props
}) {
  const backgrounds = {
    white: "bg-white",
    gray: "bg-gray-50",
    primary: "bg-primary text-white",
    black: "bg-black text-white",
  };

  const sectionProps = {
    className: `py-16 md:py-24 ${backgrounds[background]} ${className}`,
    ...props
  };

  // Agregar tracking attributes si están disponibles
  if (id) {
    sectionProps.id = id;
  }

  if (sectionName) {
    sectionProps['data-section-name'] = sectionName;
  }

  return (
    <section {...sectionProps}>
      {children}
    </section>
  );
}