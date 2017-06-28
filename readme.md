# Step 1: Initialization

## Init the project

```sh
# Init npm
npm init -y

# Install dependencies
npm i body-parser dotenv express

# Install dev dependencies
npm i -D mocha supertest

# Create directories
mkdir test

# Create files
touch .env index.js readme.md server.js test/index.js
```

## npm scripts

Updates to `package.json`:

```json
{
  "dev": "nodemon -i test index.js & mocha -w -R min",
  "start": "node index.js",
  "test": "mocha -R dot"
}
```
