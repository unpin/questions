import dbConnect from "@/lib/db/connect";
import Question from "@/models/Question";

export async function GET() {
  await dbConnect();
  try {
    const questions = await Question.find().sort({ questionNumber: 1 });
    return Response.json(questions);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}
