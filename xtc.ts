import "isomorphic-fetch";
import { createXtcActor } from "./src/createActor";
import { principal } from "./src/identity/identity";

async function main() {
  console.log("Principal", principal.toText());

  const xtcActor = createXtcActor();

  const res = await xtcActor.balance([]);
  console.log("xtc balance", res);
}

main();
