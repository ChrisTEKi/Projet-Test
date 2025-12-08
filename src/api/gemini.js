const API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";

const delay = ms => new Promise(r => setTimeout(r, ms));

export async function callGeminiApi(userPrompt, systemPrompt, apiKey = process.env.VITE_GEMINI_API_KEY) {
  if (!apiKey) throw new Error('API key Gemini non fournie. Configurez VITE_GEMINI_API_KEY dans votre .env');
  const url = `${API_BASE_URL}/${MODEL_NAME}:generateContent?key=${apiKey}`;
  const maxRetries = 3;

  const payload = {
    contents: [{ parts: [{ text: userPrompt }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] },
    tools: [{ google_search: {} }],
  };

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Gemini API error (${response.status}): ${text}`);
      }
      const result = await response.json();
      const candidate = result.candidates?.[0];
      const text = candidate?.content?.parts?.[0]?.text || '';

      let sources = [];
      const groundingMetadata = candidate?.groundingMetadata;
      if (groundingMetadata && groundingMetadata.groundingAttributions) {
        sources = groundingMetadata.groundingAttributions
          .map(attribution => ({ uri: attribution.web?.uri, title: attribution.web?.title }))
          .filter(s => s.uri && s.title);
      }
      return { text, sources };
    } catch (err) {
      if (i === maxRetries - 1) throw err;
      await delay(Math.pow(2, i) * 1000);
    }
  }
}