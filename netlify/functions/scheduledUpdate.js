// netlify/functions/scheduledUpdate.js
exports.handler = async function(event, context) {
  const response = await fetch('https://dkmatka.netlify.app/.netlify/functions/updateRandomNumber');
  const result = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Scheduled function executed.', result }),
  };
};