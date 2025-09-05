import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type TranslationData = {
  text: string;
  targetLang: string;
};

export async function POST(request: Request) {
  const data = (await request.json()) as TranslationData;
  console.log({ data });
  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: `Translate the following text into ${data.targetLang}.
Return only the translated text, without explanations or additional text.

Text:
${data.text}`,
  });

  try {
    return Response.json({
      translation: response.output_text,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}
