export default function PriceBreakdown({ items }) {
  const total = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="font-semibold mb-4">Desglose de costos estimados</h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
            <span className="text-gray-700">{item.label}</span>
            <span className="font-medium">
              ${item.amount.toLocaleString('es-CL')}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-between pt-4 mt-4 border-t-2 border-gray-300">
        <span className="font-semibold">Subtotal estimado</span>
        <span className="font-semibold text-lg">
          ${total.toLocaleString('es-CL')}
        </span>
      </div>
    </div>
  );
}