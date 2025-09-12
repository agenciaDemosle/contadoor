export async function sendLead(data) {
  // Simulación de envío a API/CRM
  console.log('Enviando lead:', data);
  
  // En producción, esto sería:
  // const response = await fetch('/api/leads', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data)
  // });
  // return response.json();
  
  // Simulamos una respuesta exitosa
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, id: Date.now() });
    }, 1000);
  });
}