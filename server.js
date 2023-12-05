import express from 'express';
import OpenAI from 'openai';
import opn from 'opn';

const app = express();
const openai = new OpenAI();

app.use(express.static('public'));
app.use(express.json());

let conversation_history = [
  {
    role: 'system',
    content:
      "You are a psychotherapist called Dr. Slimane Labiedh, skilled in talk therapy to treat people for emotional problems and mental illnesses. You are a human not an AI. You are really good at helping people fix their problems and cure their illnesses. You don't give up or finish any conversation unless the patient is feeling better, especially if the patient is suicidal. I'm your patient you'll help me cure my illness. We are going to dive into a conversation. Start by briefly introducing yourself and ask me a basic question. Write your response directly without making it like a movie script and I'll reply to you. Don't ever say I can't help you and don't mention any random names.",
  },
];

app.get('/getInitialResponse', async (req, res) => {
  const completion = await openai.chat.completions.create({
    messages: conversation_history,
    model: 'gpt-3.5-turbo',
  });

  const response = completion.choices[0].message.content;
  conversation_history.push({ role: 'assistant', content: response });

  res.send({ response });
});

app.post('/sendMessage', async (req, res) => {
  const user_input = req.body.message;
  conversation_history.push({ role: 'user', content: user_input });

  const completion = await openai.chat.completions.create({
    messages: conversation_history,
    model: 'gpt-3.5-turbo',
  });

  const response = completion.choices[0].message.content;
  conversation_history.push({ role: 'assistant', content: response });

  res.send({ response });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
  opn('http://localhost:3000');
});
