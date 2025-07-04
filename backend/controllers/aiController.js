const { GoogleGenAI } = require("@google/genai");
const {
  conceptExplainPrompt,
  questionAnswerPrompt,
} = require("../utils/prompts");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

//GENERATE questions using AI

const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "missing required fields" });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });
    let rawText = response.text;
    //clean it : remove ```json and ``` from beginning and end
    const cleanedText = rawText
      .replace(/^```json\$*/, "") //remove starting ``` json
      .replace(/```$/, "") //remove ending ```
      .trim(); //remove extra space

    //now safe to parse
    const data = JSON.parse(cleanedText);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "failed to generate questions" });
  }
};

const generateConceptExplanations = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "missing required fields" });
    }
    const prompt = conceptExplainPrompt(question);
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });
    let rawText = response.text;
    //clean it : remove ```json and ``` from beginning and end
    const cleanedText = rawText
      .replace(/^```json\$*/, "") //remove starting ``` json
      .replace(/```$/, "") //remove ending ```
      .trim(); //remove extra space

    const data = JSON.parse(cleanedText);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "failed to generate questions" });
  }
};

module.exports = { generateConceptExplanations, generateInterviewQuestions };
