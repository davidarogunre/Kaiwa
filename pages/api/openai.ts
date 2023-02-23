// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse, } from 'next'

type Data = {
  message: Promise<void>
}
require("dotenv").config()


const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey:process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const getCompletion = async(data : string) =>{

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "This is a conversation with a chatrobot named charlie. " + data,
    max_tokens: 2000
  });
  return completion.data.choices[0].text
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const requestMethod = req.method;
  const body = req.body;
  switch(requestMethod) {
    case "POST":
      res.status(200).json({message: await getCompletion("Me: " + body.voice + ". Charlie: ")})
  }
  
}

