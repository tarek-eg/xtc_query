import { Actor, HttpAgent } from "@dfinity/agent";

// Imports and re-exports candid interface
import { idlFactory } from "./xtc.did.js";
export { idlFactory } from "./xtc.did.js";
// CANISTER_ID is replaced by webpack based on node environment
export const canisterId = "aanaa-xaaaa-aaaah-aaeiq-cai";

/**
 *
 * @param {string | import("@dfinity/principal").Principal} canisterId Canister ID of Agent
 * @param {{agentOptions?: import("@dfinity/agent").HttpAgentOptions; actorOptions?: import("@dfinity/agent").ActorConfig}} [options]
 * @return {import("@dfinity/agent").ActorSubclass<import("./certified_assets.did.js.js")._SERVICE>}
 */
export const createActor = (canisterId, options) => {
  const agent = new HttpAgent({ ...options?.agentOptions });

  // Fetch root key for certificate validation during development
  if (process.env.NODE_ENV !== "production") {
    agent.fetchRootKey().catch((err) => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running",
      );
      console.error(err);
    });
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options?.actorOptions,
  });
};

// causes error ReferenceError: fetch is not defined
// /**
//  * A ready-to-use agent for the certified_assets canister
//  * @type {import("@dfinity/agent").ActorSubclass<import("./certified_assets.did.js")._SERVICE>}
//  */
// export const certified_assets = createActor(canisterId, {
//   fetch,
// });
