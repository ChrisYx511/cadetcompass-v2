import OpenAI from "openai"
const openAIClient: OpenAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

async function main() {
  const completion = await openAIClient.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair.",
      },
      {
        role: "user",
        content:
          "Compose a poem that explains the concept of recursion in programming.",
      },
    ],
    model: "gpt-3.5-turbo",
  })

  console.log(completion.choices[0])
}

main()
