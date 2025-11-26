// src/api/waterTowerApi.ts

export interface WaterTowerReply {
  reply: string;
}

export async function sendWaterTowerQuestion(
  message: string
): Promise<WaterTowerReply> {
  const response = await fetch(
    'https://innovationpilot-hafugqdfbzdyaecn.northeurope-01.azurewebsites.net/message/full',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: message,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data: any = await response.json();
  console.log('Water tower API raw response:', data);

  // Get the last non-empty string "content" from data.text[]
  const texts = Array.isArray(data.text) ? data.text : [];
  const lastWithContent = [...texts]
    .reverse()
    .find(
      (m: any) =>
        typeof m?.content === 'string' && m.content.trim().length > 0
    );

  const reply =
    lastWithContent?.content ??
    'No message returned from water-tower helper 🤔';

  return { reply };
}
