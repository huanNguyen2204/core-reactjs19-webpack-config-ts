# Docs of react.js19 core

### 1. Some requirements:

(Must installed before)

- npm `v10+`
- node `v22+`
- yarn `v4+`

=> Clone this repo and run `yarn install`

#

### 2. Including

- Babeljs
- ESlint + TypescriptESlint
- Prettier
- Webpack
- TailwindCSS `v4`
- React.js `v19` + React Router `v7`
- .env configuration (use process.env.<name-of-key>)
- CSS, SCSS, LESS configuration

=> Note: `Jest.config` still not follow in the core built.

#

### 3. ESlint rules

- Must use double quotes `""` instead of single one `''`.
- Must have semi `;` at the last line.
- Use regular function `function <name-of-funcs>() {}` and arrow function `const <name-of-funcs> = () => {}` but must have `;` at last of arrow function
