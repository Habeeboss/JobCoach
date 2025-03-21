import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import { AzureOpenAI } from 'openai';
import { getBearerTokenProvider, DefaultAzureCredential } from '@azure/identity';
dotenv.config();

const deployment = 'gpt-4o';

const credential = new DefaultAzureCredential();
const scope = 'https://cognitiveservices.azure.com/.default';
const azureADTokenProvider = getBearerTokenProvider(credential, scope);

console.log("ENV CHECK", {
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  endpoint: process.env.AZURE_OPENAI_ENDPOINT,
  deployment: process.env.OPENAI_ENGINE
});

const openai = new AzureOpenAI({ 
                                 apiVersion: process.env.OPENAI_API_VERSION,
                                 apiKey: process.env.AZURE_OPENAI_API_KEY,
                                 endpoint: process.env.AZURE_OPENAI_ENDPOINT, 
                                 defaultDeployment: process.env.OPENAI_ENGINE, // the deployment name in Azure
                                   });



async function main() {
  console.log('Non-streaming:');
  const result = await openai.chat.completions.create({
    model: deployment,
    messages: [{ role: 'user', content: 'Say hello!' }],
  });
  console.log(result.choices[0]?.message?.content);

  console.log();
  console.log('Streaming:');
  const stream = await openai.chat.completions.create({
    model: deployment,
    messages: [{ role: 'user', content: 'Say hello!' }],
    stream: true,
  });

  for await (const part of stream) {
    process.stdout.write(part.choices[0]?.delta?.content ?? '');
  }
  process.stdout.write('\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const azureAI = process.env.AZURE_OPENAI_KEY;  // Load API Key from .env
const azureEndpoint = process.env.AZURE_OPENAI_ENDPOINT; // Load Azure Endpoint
const azureApiVersion = process.env.OPENAI_API_VERSION; // Load Azure Endpoint
const DEPLOYMENT_NAME = process.env.OPENAI_ENGINE

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello, there! I'm a Job Coaching Assistant. How can I help you?",
  });
});

app.post("/", async (req, res) => {
  const { messages } = req.body;

  if (!Array.isArray(messages)  || !messages.length) {
    return res.status(400).json({ success: false, message: "Messages Required" });
  }

  let requiredPrompt =
  "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n" +
  messages
    .map((item) => `${item.from == "ai" ? "AI: " : "Human: "}${item.text}`)
    .join("\n") +
  "\nAI: ";

  // const reqUrl =  `${azureEndpoint}/openai/chat/completions?api-version=${azureApiVersion}`;
  const url = `${azureEndpoint}/openai/deployments/gpt-4-2/chat/completions?api-version=${azureApiVersion}`;



  const reqBody = {
    model: process.env.OPENAI_ENGINE,
    prompt: requiredPrompt,
    max_tokens: 3000,
    temperature: 0.6,
  };

  console.log(url)
  try {
    const response = await axios.post(url, reqBody, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${azureAI}`// Use Azure OpenAI API key
      },
    });

    const data = response.data;
    const answer = Array.isArray(data.choices) ? data.choices[0]?.text : "";

    res.status(200).json({
      success: true,
      data: answer.trim(),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: err,
    });
    console.log(err)
  }
});

app.listen(5500, () => console.log("Server is running on port 5500"));