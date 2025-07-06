const { Configuration, OpenAIApi } = require('openai');
exports.handler = async (event) => {
  const { title, topic, isBattle, coinGoals, prize, extras } = JSON.parse(event.body);
  const prompt = `1080x1920 TikTok live background with title "${title}", topic "${topic}", `
    + (isBattle ? `box battle goals ${coinGoals} prize "${prize}", ` : 'normal live, ')
    + `text: ${extras.join(', ')}`;
  const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));
  const res = await openai.createImage({ prompt, size:'1080x1920', n:1 });
  return { statusCode:200, body: JSON.stringify({ imageUrl: res.data.data[0].url }) };
};
