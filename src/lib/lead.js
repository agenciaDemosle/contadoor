export async function sendLead(data) {
  console.log('Enviando cotización lead:', data);

  try {
    // Use environment variable or fallback to production URL
    const baseUrl = import.meta.env.VITE_API_URL || 'https://contadoor.cl/api';
    const apiUrl = `${baseUrl}/cotizaciones-submit.php`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Error desconocido');
    }

    return result;

  } catch (error) {
    console.error('Error enviando cotización lead:', error);
    throw error;
  }
}