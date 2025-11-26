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
      body: JSON.stringify({ text: message }),
    }
  );

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data: any = await response.json();
  console.log('RAW WATER TOWER RESPONSE', data);

  // data.text is an array of messages like the ones in your screenshot.
  const messages = Array.isArray(data.text) ? data.text : [];

  // Take the LAST message whose type is "ai" (assistant answer).
  const lastAi = [...messages]
    .reverse()
    .find((m: any) => m?.type === 'ai' && typeof m.content === 'string');

  const reply =
    lastAi?.content ??
    'No AI message found in API response 🤔';

  return { reply };
}
