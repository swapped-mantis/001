const readline = require('readline');
const process = require('process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function chat() {
  const message = create_message();

  send_text(message);
}

console.log('Type your message below: (q to quit) \n');

const create_message = () => {
  rl.question('-> ', (message => {
    if (message == 'q') process.exit(0);
    else if (message.length == 0) return create_message();
    return message;
  }));
}

async function send_text(message) {
  const response = await fetch('http://localhost:1111', {
    "method": "POST",
    "authorization": {"name": "dev", "pass": "12345"},
    "body": JSON.stringify(message)
  });

  const data = await response.json();

  console.log(data);
}

chat();