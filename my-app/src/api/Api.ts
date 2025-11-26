// src/api/Api.ts

export interface WaterTowerReply {
  reply: string;
  steps: string[]; // only tool steps
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
  console.log('RAW WATER TOWER RESPONSE', data);

  const messages = Array.isArray(data.text) ? data.text : [];

  // 1) Last AI message = reply
  const lastAi = [...messages]
    .reverse()
    .find(
      (m: any) => m?.type === 'ai' && typeof m.content === 'string'
    );

  const reply =
    lastAi?.content ?? 'No AI message found in API response 🤔';

  // 2) TOOL STEPS ONLY for the accordion
  const steps: string[] = messages
    .filter((m: any) => m?.type === 'tool')
    .map((m: any, idx: number) => {
      const name = m.tool_name ?? 'Unknown tool';
      const args = JSON.stringify(m.content, null, 2);
      return `Tool step ${idx + 1}: ${name}\n${args}`;
    });

  return { reply, steps };
}
