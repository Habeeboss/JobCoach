// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const axios = require("axios");
// const openai = require('openai');

// // Initialize OpenAI
// const openaiClient = new openai.OpenAI({
//   apiKey: '1KFgyuMNZnWgAOrp4bfCj9U2SR3muVjd5hj0YoprqHlAdoYGRgYYJQQJ99BCACYeBjFXJ3w3AAABACOGogG4',
//   azureOpenAIEndpoint: 'https://jobgroup5.openai.azure.com',
//   azureDeployment: 'gpt-4o',
// });

// const AZURE_OPENAI_ENDPOINT = "https://jobgroup5.openai.azure.com";
// const AZURE_OPENAI_KEY = "1KFgyuMNZnWgAOrp4bfCj9U2SR3muVjd5hj0YoprqHlAdoYGRgYYJQQJ99BCACYeBjFXJ3w3AAABACOGogG4";
// const API_VERSION = "2024-11-20"; // Ensure this is the correct API version
// const MODEL_NAME = "gpt-4o"; // Change to "gpt-3.5-turbo" or other models as needed


// dotenv.config();

// //call express to initialize app
// const app = express();

// //for request sharing
// app.use(cors({
//   origin: "http://localhost:3000", // Allow frontend requests
//   methods: ["POST"],
// }))
// app.use(express.json());



// app.get("/", async (req, res) => {
//   res.status(200).send({
//     message: "Hello, there! Am a Job Coaching Assistant, How can I help you? ",
//   });
// });



// //create a route
// app.post("/", async (req, res) => {
//   const { messages } = req.body;

//   if (!Array.isArray(messages) || !messages.length) {
//     res.status(400).json({
//       success: false,
//       message: "Messages Required",
//     });
//     return;
//   }

//   let requiredPrompt =
//     "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n" +
//     messages
//       .map((item) => `${item.from == "ai" ? "AI: " : "Human: "}${item.text}`)
//       .join("\n") +
//     "\nAI: ";

//   // console.log(requiredPrompt);


//   const reqUrl =  `${AZURE_OPENAI_ENDPOINT}/openai/chat/completions?api-version=${API_VERSION}`;
//   const reqBody = {
//     model: MODEL_NAME,
//     prompt: requiredPrompt,
//     max_tokens: 3000,
//     temperature: 0.6,
//   };
//   console.log(reqBody)
//   try {
//     const response = await axios.post(reqUrl, reqBody, {
//       headers: {
//         "content-type": "application/json",
//         authorization: `Bearer ${AZURE_OPENAI_KEY}`,
//       },
//     });
//     console.log(response)
//     const data = response.data;
//     const answer = Array.isArray(data.choices) ? data.choices[0]?.text : "";

//     res.status(200).json({
//       success: true,
//       data: answer.trim(),
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message || "Something went wrong",
//       error: err,
//     });
//   }
// });

// app.listen(5500, () => console.log("Server is up on 5500"));

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import { AzureOpenAI } from 'openai';
import { getBearerTokenProvider, DefaultAzureCredential } from '@azure/identity';
dotenv.config();

// Corresponds to your Model deployment within your OpenAI resource, e.g. gpt-4-1106-preview
// Navigate to the Azure OpenAI Studio to deploy a model.
const deployment = 'gpt-4o';

const credential = new DefaultAzureCredential();
const scope = 'https://cognitiveservices.azure.com/.default';
const azureADTokenProvider = getBearerTokenProvider(credential, scope);

console.log("ENV CHECK", {
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  endpoint: process.env.AZURE_OPENAI_ENDPOINT,
  deployment: process.env.OPENAI_ENGINE
});


// Make sure to set AZURE_OPENAI_ENDPOINT with the endpoint of your Azure resource.
// You can find it in the Azure Portal.
const openai = new AzureOpenAI({ 
                                 apiVersion: '2024-11-20',
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
    model: "gpt-4o",
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