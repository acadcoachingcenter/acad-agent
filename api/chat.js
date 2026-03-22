module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const messages = req.body?.messages;
    return res.status(200).json({ 
      reply: `Test reply. Messages received: ${messages?.length || 0}` 
    });
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}