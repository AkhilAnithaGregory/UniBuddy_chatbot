import groq from "../config/groqConfig.js";
import Chat from "../models/chat.js";
import crisisKeyword from "../json/crisisKeyword.json" with { type: "json" };
import getUserIdFromToken from "../services/getUserIdFromToken.js";

function checkSafety(message) {
  const lower = message.toLowerCase();
  for (const [category, data] of Object.entries(crisisKeyword.categories)) {
    if (data.keywords.some(keyword => lower.includes(keyword))) {
      return {
        category,
        response: data.response,
        resources: data.resources || []
      };
    }
  }
  return null;
}

export async function sendChatMessage(req, res) {
  try {
    const id = getUserIdFromToken(req);
    const { conversationId, message } = req.body;

    if (!conversationId) {
      return res.status(400).json({ error: "conversationId is required" });
    }

    await Chat.create({
      conversationId,
      userId: id,
      role: "user",
      content: message
    });

    const safetyHit = checkSafety(message);
    if (safetyHit) {
      await Chat.create({
        conversationId,
        userId:id,
        role: "assistant",
        content: safetyHit.response
      });

      return res.json({
        reply: safetyHit.response,
        category: safetyHit.category,
        resources: safetyHit.resources
      });
    }

    const chatHistory = await Chat.find({ conversationId }).sort({ createdAt: 1 });

    const messages = chatHistory.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages
    });

    const reply = response.choices[0].message.content;

    await Chat.create({
      conversationId,
      userId:id,
      role: "assistant",
      content: reply
    });

    res.json({ reply });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export async function getConversation(req, res) {
  try {
    const { conversationId } = req.params;
    const id = getUserIdFromToken(req);
    const exists = await Chat.findOne({ conversationId, userId: id });
    if (!exists) {
      return res.status(403).json({
        error: "You are not authorized to view this conversation"
      });
    }

    const messages = await Chat.find({ conversationId, userId: id }).sort({
      createdAt: 1
    });

    res.json(messages);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteConversation(req, res) {
  try {
    const { conversationId } = req.params;

    if (!conversationId) {
      return res.status(400).json({ error: "conversationId is required" });
    }

    const id = getUserIdFromToken(req);

    const exists = await Chat.findOne({ conversationId, userId: id });

    if (!exists) {
      return res.status(403).json({
        error: "You are not authorized to delete this conversation"
      });
    }

    await Chat.deleteMany({ conversationId, userId: id });

    return res.json({
      message: "Conversation deleted successfully",
      conversationId
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
