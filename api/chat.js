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
    if (!process.env.GROQ_API_KEY) {
      return res.status(200).json({ reply: "ERROR: GROQ_API_KEY is undefined" });
    }
    return res.status(200).json({ reply: `Key length: ${process.env.GROQ_API_KEY.length} characters` }); 

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