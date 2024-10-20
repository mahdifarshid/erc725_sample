const solc = require('solc');
const fs = require('fs');
const path = require('path');

// Path to the Solidity contract
const contractPath = path.resolve(__dirname, '../contracts', 'HelloWorld.sol');
const source = fs.readFileSync(contractPath, 'utf8');

// Compile the contract
const input = {
  language: 'Solidity',
  sources: {
    'HelloWorld.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['abi', 'evm.bytecode'],
      },
    },
  },
};

// Compile the contract
const output = solc.compile(JSON.stringify(input));

// Check for errors in output
if (output.errors) {
  output.errors.forEach((err) => {
    console.error(err.formattedMessage);
  });
  throw new Error('Compilation failed');
}

// Save ABI and Bytecode to build folder
const buildPath = path.resolve(__dirname, '../build');
if (!fs.existsSync(buildPath)) {
  fs.mkdirSync(buildPath);
}

fs.writeFileSync(
  path.resolve(buildPath, 'HelloWorld.json'),
  JSON.stringify(output.contracts['HelloWorld.sol'].HelloWorld, null, 2)
);

console.log('Contract compiled successfully!');
