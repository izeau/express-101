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
touch .env app.js readme.md server.js test/app.js
```

## npm scripts

Updates to `package.json`:

```json
{
  "dev": "nodemon -q -i test server.js & mocha -w -R min",
  "test": "mocha -R dot"
}
```
