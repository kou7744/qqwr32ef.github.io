const terminal = document.getElementById('terminal');
const commandInput = document.getElementById('command-input');

const commands = {
  help: () => `Available commands:
  - help: Show this help message
  - clear: Clear the terminal
  - date: Show current date
  - echo [text]: Display text
  - ls: List directory contents
  - whoami: Display current user
  - uname: Display system information`,
  
  clear: () => {
    const outputs = terminal.querySelectorAll('.output');
    outputs.forEach(output => output.remove());
    return '';
  },
  
  date: () => new Date().toString(),
  
  echo: (args) => args.join(' '),
  
  ls: () => `bin  etc  home  usr  var`,
  
  whoami: () => 'guest',
  
  uname: () => 'Linux Terminal 1.0.0'
};

function createOutputElement(content) {
  const output = document.createElement('div');
  output.className = 'output';
  output.textContent = content;
  return output;
}

function createNewInputLine() {
  const inputLine = document.createElement('div');
  inputLine.className = 'command-line';
  
  const prompt = document.createElement('span');
  prompt.className = 'prompt';
  prompt.textContent = 'guest@terminal:~$';
  
  inputLine.appendChild(prompt);
  return inputLine;
}

function executeCommand(commandText) {
  const [cmd, ...args] = commandText.trim().split(' ');
  
  if (cmd === '') return '';
  
  const command = commands[cmd];
  if (command) {
    return command(args);
  } else {
    return `Command not found: ${cmd}`;
  }
}

commandInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const commandText = commandInput.value;
    
    // Create output for the command
    const commandLine = document.createElement('div');
    commandLine.className = 'command-line';
    commandLine.innerHTML = `<span class="prompt">guest@terminal:~$</span> ${commandText}`;
    terminal.insertBefore(commandLine, commandInput.parentElement);
    
    // Execute and display output
    const output = executeCommand(commandText);
    if (output) {
      terminal.insertBefore(createOutputElement(output), commandInput.parentElement);
    }
    
    // Clear input and scroll to bottom
    commandInput.value = '';
    terminal.scrollTop = terminal.scrollHeight;
  }
});