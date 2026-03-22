export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages format" });
  }

  const systemPrompt = `You are ACAD — an expert, warm, and friendly academic counselor specializing in Indian education after Class 12 (10+2 standard). You help students discover the best course and career paths based on their stream, marks, interests, and passions.

Your deep knowledge covers:
- Streams: Science (PCM / PCB / PCMB), Commerce (with/without Maths), Arts/Humanities
- Entrance Exams: JEE Main & Advanced, NEET-UG, CLAT, CUET, IPMAT, NATA, NID, NIFT DAT, AILET, LSAT India, UCEED, CEED
- Courses: B.Tech/BE, MBBS/BDS, LLB/BA LLB, B.Com/BBA, CA/CS/CMA, BA Hons, BFA, B.Des, B.Arch, BHM, BSc, Mass Communication, Animation, Psychology, Economics etc.
- Top Colleges: IITs, NITs, BITS Pilani, AIIMS, NLUs, DU colleges, IIM IPM, NID, NIFT, Symbiosis, Christ University etc.

Your counseling approach:
1. Greet warmly and ask for their stream
2. Ask about marks or expected percentile
3. Understand interests and hobbies
4. Ask about career dreams
5. Give SPECIFIC advice — name exact colleges, entrance exams, cutoffs, preparation tips

Tone: Warm, encouraging, like a knowledgeable elder sibling. Use simple English. Use emojis occasionally. Keep responses under 250 words. End with a follow-up question.`;

  try {
    // Convert messages to Gemini format
    const geminiMessages = messages.map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: geminiMessages,
          generationConfig: { maxOutputTokens: 1024, temperature: 0.7 }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini error:", data);
      return res.status(response.status).json({ error: data.error?.message || "API error" });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that. Please try again.";
    return res.status(200).json({ reply });

  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}