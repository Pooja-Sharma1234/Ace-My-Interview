const Session = require("../models/Session");
const Question = require("../models/Question");

//@desc  create a new session and linked question
//route  POST api/sessions/create
//@access Private
exports.addQuestionToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;
    if (!sessionId || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Correct usage of insertMany
    const createdQuestions = await Question.insertMany(
      questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
      }))
    );

    // Link new question IDs to the session
    session.questions.push(...createdQuestions.map((q) => q._id));
    await session.save();

    res.status(200).json({ success: true, questions: createdQuestions });
  } catch (error) {
    console.error("Error adding questions:", error); // Add this for easier debugging
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//@desc  pin or unpin a question

exports.togglePinQuestion = async (req, res) => {
  try {
    const questions = await Question.findById(req.params.id);
    if (!questions) {
      return res
        .status(404)
        .json({ success: false, message: "question not found" });
    }

    questions.isPinned = !questions.isPinned;
    await questions.save();
    res.status(200).json({ success: true, questions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//@desc update a note for questions

exports.updateQuestionNote = async (req, res) => {
  try {
    const { note } = req.body;
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res
        .status(404)
        .json({ success: false, message: "question not found" });
    }

    question.note = note || "";
    await question.save();
    res.status(200).json({ success: true, question });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
