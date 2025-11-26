// src/api/waterTowerApi.ts

export interface WaterTowerReply {
  reply: string;
  // add more fields if your API returns them (e.g. towerId, riskScore, etc.)
}

export async function sendWaterTowerQuestion(
  message: string
): Promise<WaterTowerReply> {
  
  const response = await fetch('https://innovationpilot-hafugqdfbzdyaecn.northeurope-01.azurewebsites.net/messages/full', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // add auth headers here if needed
      // 'Authorization': 'Bearer YOUR_TOKEN',
    },
    body: JSON.stringify({
      text: message,
      // include anything your API needs:
      // userId, towerId, location, etc.
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();

  return {
    reply: data.reply ?? 'No reply field in API response 🤔',
  };
}
