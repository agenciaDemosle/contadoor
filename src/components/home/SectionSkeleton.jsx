export default function SectionSkeleton({ height = "h-96" }) {
  return (
    <div className={`animate-pulse bg-gray-100 ${height} w-full rounded-lg flex items-center justify-center`}>
      <div className="text-center">
        <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-4 animate-spin"></div>
        <div className="h-4 bg-gray-300 rounded w-32 mx-auto"></div>
      </div>
    </div>
  );
}