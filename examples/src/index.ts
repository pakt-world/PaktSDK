import { Login } from "./auth";

const run = async () => {
  const responseLogin = await Login();
  console.log(responseLogin);
};

run();
