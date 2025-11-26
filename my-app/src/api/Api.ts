// src/api/waterTowerApi.ts

export interface WaterTowerReply {
  reply: string;
  steps: string[];     // 👈 add steps to the type
}

export async function sendWaterTowerQuestion(
  message: string
): Promise<WaterTowerReply> {
  const response = await fetch(
    'https://innovationpilot-hafugqdfbzdyaecn.northeurope-01.azurewebsites.net/message/full',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: message }),
    }
  );

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data: any = await response.json();
  console.log('RAW WATER TOWER RESPONSE', data);

  const messages = Array.isArray(data.text) ? data.text : [];

  // final reply = last AI message
  const lastAi = [...messages]
    .reverse()
    .find((m: any) => m?.type === 'ai' && typeof m.content === 'string');

  const reply =
    lastAi?.content ?? 'No AI message found in API response 🤔';

  // steps for accordion (you can tweak this)
  const steps: string[] = messages
    .filter((m: any) => typeof m.content === 'string' && m.content.trim())
    .map(
      (m: any, idx: number) =>
        `Step ${idx + 1}: [${m.type ?? 'unknown'}] ${m.content}`
    );

  return { reply, steps };   // 👈 now we really return steps
}
