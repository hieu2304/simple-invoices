# React + TypeScript + Vite

install application: npm install / yarn add
start application: yarn dev
test application: yarn test

---

Please fill CLIENT_ID and CLIENT_SECRET to file env.sample.json
=> should be implemented by using .ENVIRONMENT

There is 2 pages follow
/login => login component
/index => home page

=> You need to login before you want to create invoices/ see invoices list
Token and org_token = is save in local store => it should be implement save in session/cookies

The object invoices is too big => Make sure created you need to fill all information to form modal create invoices
** There are few validation for input => need implement validate more for specific input type
** Need to add more initalization values for form create invoices

---

I already created design systems, instance, hooks to project.

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
