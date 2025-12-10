import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const { deviceId } = request.query;

  if (!deviceId || typeof deviceId !== 'string') {
    return response.status(400).json({ error: 'deviceId is required' });
  }

  try {
    const url = `https://account.roomalert.com/public/device/${deviceId}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      return response.status(res.status).json({ 
        error: `Room Alert API error: ${res.status}` 
      });
    }

    const data = await res.json();
    return response.status(200).json(data);
  } catch (error) {
    console.error('Error fetching from Room Alert:', error);
    return response.status(500).json({ 
      error: 'Failed to fetch Room Alert data' 
    });
  }
}
