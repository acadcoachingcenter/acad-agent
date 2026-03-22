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
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages
        ],
        max_tokens: 1024,
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(200).json({ 
        reply: `Error ${response.status}: ${data.error?.message || JSON.stringify(data)}` 
      });
    }

    const reply = data.choices?.[0]?.message?.content || "Sorry, please try again.";
    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(200).json({ reply: `Server error: ${error.message}` });
  }
}