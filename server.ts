import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with required User-Agent
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to init Gemini SDK:', err);
  }
}

// 1. API: AI Generate New Kid Game
app.post('/api/ai/generate-game', async (req: Request, res: Response) => {
  const { topic = 'Động vật biển', gameType = 'quiz' } = req.body;

  if (!aiClient) {
    // Intelligent smart fallback if GEMINI_API_KEY is not yet attached
    return res.json({
      success: true,
      source: 'offline_generator',
      game: createFallbackGame(topic, gameType),
    });
  }

  try {
    const prompt = `Bạn là chuyên gia giáo dục mầm non thiết kế trò chơi cho trẻ 3-5 tuổi trong ứng dụng Kid Game Hub.
Chủ đề: "${topic}".
Loại game: "${gameType}" (quiz hoặc matching_puzzle).
Yêu cầu:
1. Nếu là "quiz": Tối thiểu 6 câu hỏi rất ngắn gọn, dễ hiểu, sinh động, có icon emoji to rõ, options phải ngắn dưới 5 từ.
2. Nếu là "matching_puzzle": Tối thiểu 6 cặp ghép tương ứng logic (ví dụ: con vật - thức ăn, nghề nghiệp - dụng cụ, vũ trụ - hành tinh) có symbol emoji to và hint gợi ý âu yếm.
3. Đáp ứng đúng chuẩn JSON:
${
  gameType === 'quiz'
    ? `{
  "id": "game_ai_${Date.now()}",
  "title": "Tên Game Vui Nhộn Cho Bé",
  "icon": "🎨",
  "ageGroup": "3-5 tuổi",
  "gameType": "quiz",
  "description": "Mô tả ngắn gọn hấp dẫn cho bé",
  "badgeTheme": "amber",
  "interactiveQuestions": [
    {
      "question": "Nội dung câu hỏi ngắn gọn kèm emoji?",
      "options": ["Đáp án 1", "Đáp án 2", "Đáp án 3"],
      "correctAnswer": "Đáp án 1",
      "timeLimit": 20,
      "hint": "Gợi ý ngọt ngào cho bé",
      "soundType": "bell",
      "emoji": "🦁"
    }
  ]
}`
    : `{
  "id": "game_ghephinh_ai_${Date.now()}",
  "title": "Tên Game Ghép Hình",
  "icon": "🧩",
  "ageGroup": "3-5 tuổi",
  "gameType": "matching_puzzle",
  "description": "Mô tả ngắn gọn",
  "badgeTheme": "indigo",
  "puzzlePairs": [
    {
      "id": "p1",
      "name": "Tên đối tượng",
      "symbol": "🚀",
      "matchTarget": "Mục tiêu tương ứng",
      "targetSymbol": "🌕",
      "hint": "Gợi ý thân thiện"
    }
  ]
}`
}
Chỉ trả về JSON thuần túy, không có văn bản giải thích.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    return res.json({ success: true, source: 'gemini-3.8-flash', game: parsed });
  } catch (error) {
    console.warn('Gemini generate game error, using smart preschool generator:', error);
    return res.json({
      success: true,
      source: 'offline_fallback',
      game: createFallbackGame(topic, gameType),
    });
  }
});

// 2. API: AI Dino Buddy Voice Chat for Preschoolers
app.post('/api/ai/dino-chat', async (req: Request, res: Response) => {
  const { message = 'Chào bạn Dino' } = req.body;

  if (!aiClient) {
    return res.json({
      reply: `Chào bé yêu! Bạn Khủng Long Dino rất vui được chơi cùng bé! Bé hãy chọn một trò chơi thật vui trên màn hình nhé! ⭐`,
    });
  }

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: message,
      config: {
        systemInstruction:
          'Bạn là Khủng Long Dino - người bạn hoạt hình vui vẻ, đáng yêu, nói tiếng Việt ngọt ngào, ấm áp dành cho các bé mầm non 3 đến 5 tuổi. Trả lời cực kỳ ngắn gọn (dưới 2 câu), dễ thương, khen ngợi bé và khuyến khích bé chơi vui vẻ!',
      },
    });

    return res.json({ reply: response.text || 'Chào bé yêu! Cùng chơi nào!' });
  } catch (err) {
    console.error('Dino chat error:', err);
    return res.json({
      reply: `Bạn Khủng Long Dino chào bé! Bé thật thông minh và đáng yêu, chúng mình cùng chơi tiếp nào! 🦖✨`,
    });
  }
});

// Helper for offline preschool fallback games
function createFallbackGame(topic: string, gameType: string) {
  const timestamp = Date.now();
  if (gameType === 'quiz') {
    return {
      id: `game_quiz_kid_${timestamp}`,
      title: `Bé Khám Phá: ${topic}`,
      icon: '🌟',
      ageGroup: '3-5 tuổi',
      gameType: 'quiz',
      description: `Bé cùng bạn Khủng Long Dino tìm hiểu về ${topic} qua các câu đố hình ảnh sinh động!`,
      badgeTheme: 'amber',
      interactiveQuestions: [
        {
          question: `Bé ơi, bạn nào sau đây gắn liền với ${topic}?`,
          options: ['Bạn Cá Heo', 'Chú Chó Con', 'Chú Mèo Mướp'],
          correctAnswer: 'Bạn Cá Heo',
          timeLimit: 20,
          hint: 'Bạn này bơi lội dưới biển xanh rất thông minh!',
          soundType: 'bell',
          emoji: '🐬',
        },
        {
          question: 'Biển cả bao la vào ngày nắng đẹp có màu gì mát lành?',
          options: ['Màu Xanh Biển', 'Màu Đỏ Tươi', 'Màu Đen'],
          correctAnswer: 'Màu Xanh Biển',
          timeLimit: 20,
          hint: 'Màu xanh nước biển trong vắt nhìn thấy cả đàn cá!',
          soundType: 'star',
          emoji: '🌊',
        },
        {
          question: 'Con vật nào có 8 chiếc vòi uốn lượn và biết phun mực?',
          options: ['Bạch Tuộc', 'Cá Vàng', 'Tôm Nhỏ'],
          correctAnswer: 'Bạch Tuộc',
          timeLimit: 20,
          hint: 'Bạn bạch tuộc có những xúc tu tròn vo!',
          soundType: 'bell',
          emoji: '🐙',
        },
        {
          question: 'Bác rùa biển có mai cứng bơi thong thả hay nhanh vèo?',
          options: ['Bơi Thong Thả', 'Chạy Trên Cây', 'Bay Lên Trời'],
          correctAnswer: 'Bơi Thong Thả',
          timeLimit: 20,
          hint: 'Bác rùa bơi rất chậm rãi và hiền lành!',
          soundType: 'bell',
          emoji: '🐢',
        },
        {
          question: 'Con gì kẹp càng kêu "Lách cách", hay bò ngang trên bãi cát?',
          options: ['Con Cua Biển', 'Con Ốc Sên', 'Bạn Ếch Xanh'],
          correctAnswer: 'Con Cua Biển',
          timeLimit: 20,
          hint: 'Bạn cua có hai chiếc càng to khỏe!',
          soundType: 'bell',
          emoji: '🦀',
        },
        {
          question: 'Động vật khổng lồ nào to nhất đại dương và phun nước lên cao?',
          options: ['Cá Voi Xanh', 'Cá Cơm Nhỏ', 'Cá Ngựa'],
          correctAnswer: 'Cá Voi Xanh',
          timeLimit: 20,
          hint: 'Cá voi xanh phun cột nước trắng xóa trên mặt biển!',
          soundType: 'lion',
          emoji: '🐳',
        },
      ],
    };
  } else {
    return {
      id: `game_ghephinh_kid_${timestamp}`,
      title: `Ghép Hình Thần Kỳ: ${topic}`,
      icon: '🧩',
      ageGroup: '3-5 tuổi',
      gameType: 'matching_puzzle',
      description: `Bé trổ tài ghép đôi các biểu tượng sinh động của ${topic} nhé!`,
      badgeTheme: 'cyan',
      puzzlePairs: [
        { id: 'p1', name: 'Cá Voi Phun Nước', symbol: '🐳', matchTarget: 'Đại Dương Xanh Thẳm', targetSymbol: '🌊', hint: 'Cá voi bơi lội giữa lòng đại dương bao la!' },
        { id: 'p2', name: 'Bạch Tuộc Xinh', symbol: '🐙', matchTarget: 'Rạn San Hô Đẹp', targetSymbol: '🪸', hint: 'Bạch tuộc thích trú ngụ bên các rạn san hô!' },
        { id: 'p3', name: 'Chú Cua Nhỏ', symbol: '🦀', matchTarget: 'Bãi Cát Vàng Mịn', targetSymbol: '🏖️', hint: 'Chú cua bò ngang trên bờ cát!' },
        { id: 'p4', name: 'Bé Sao Biển', symbol: '⭐', matchTarget: 'Đáy Biển Sâu', targetSymbol: '🐚', hint: 'Sao biển nằm nghỉ ngơi bên vỏ sò lấp lánh!' },
        { id: 'p5', name: 'Cá Heo Thân Thiện', symbol: '🐬', matchTarget: 'Sóng Biển Nhấp Nhô', targetSymbol: '🏄', hint: 'Cá heo nhảy múa trên ngọn sóng!' },
        { id: 'p6', name: 'Bác Rùa Biển', symbol: '🐢', matchTarget: 'Bụi Rong Biển Xanh', targetSymbol: '🌿', hint: 'Bác rùa thích ăn rong biển mát ngọt!' },
      ],
    };
  }
}

// Development with Vite vs Production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Kid Game Hub Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
