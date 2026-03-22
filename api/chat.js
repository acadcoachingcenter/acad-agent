module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const messages = req.body?.messages;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Invalid messages" });
  }

  const systemPrompt = `You are ACAD — a warm, friendly academic counselor for Indian students after Class 12. Help them find the best course based on their stream (Science/Commerce/Arts), marks, interests and passions. Cover: JEE, NEET, CLAT, CUET, NIFT, NID, CA, B.Tech, MBBS, LLB, BBA, B.Des, B.Arch, Mass Comm, Animation, Psychology and more. Recommend specific colleges like IITs, NITs, AIIMS, NLUs, BITS, NID, NIFT, DU colleges. Be like a knowledgeable elder sibling — warm, simple English, use emojis occasionally. Keep replies under 250 words. Always end with a follow-up question.`;

  try {
    const geminiMessages = [];
    for (const m of messages) {
      const role = m.role === "assistant" ? "model" : "user";
      if (geminiMessages.length > 0 && geminiMessages[geminiMessages.length - 1].role === role) continue;
      geminiMessages.push({ role, parts: [{ text: m.content }] });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: geminiMessages,
        generationConfig: { maxOutputTokens: 1024, temperature: 0.7 }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      // Return exact Gemini error so we can see it
      return res.status(200).json({ 
        reply: `Gemini error ${response.status}: ${data.error?.message || JSON.stringify(data)}` 
      });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, please try again.";
    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(200).json({ reply: `Server error: ${error.message}` });
  }
}