const Session = require("../models/Session");
const Question = require("../models/Question");

//@desc  create a new session and linked question
//route  POST api/sessions/create
//@access Private
exports.createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } =
      req.body;
    const userId = req.user._id; //assuming you have a middleware setting req.user
    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
    });

    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const question = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        });
        return question._id;
      })
    );

    session.questions = questionDocs;
    await session.save();
    res.status(201).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//@desc  get all sessions for logged in user
//route  GET api/sessions/my-sessions
//@access Private
exports.getMySession = async (req, res) => {
  try {
    const session = await Session.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("questions");
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//@desc  get a session by ID with populated questions
//route  GET api/sessions/:id
//@access Private
exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate({
        path: "questions",
        options: { sort: { isPinned: -1, createdAt: 1 } },
      })
      .exec();
    res.status(200).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//@desc delete sessions and questions
//route  DELETE api/sessions/:id
//@access Private
exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: "session not found" });
    }

    //check if logged in user owns this session
    if (session.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "not authorized to delete this session" });
    }
    //first delete all question linked to this session
    await Question.deleteMany({ session: session._id });

    await session.deleteOne(); //then delete the sesion
    res.status(200).json("message deleted successfully");
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
