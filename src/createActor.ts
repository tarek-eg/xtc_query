import { Actor, HttpAgent } from "@dfinity/agent";
import { identity } from "../src/identity/identity";
import {
  canisterId as xtcCanisterId,
  idlFactory as xtcIdlFactory,
} from "./canisters/xtc";
import _XTC_SERVICE from "./canisters/xtc/xtc.did";

export const host = process.env.HOST || "http://localhost:8000";
export const agent = new HttpAgent({
  identity,
  host,
});

export function createXtcActor() {
  const actor = Actor.createActor<_XTC_SERVICE>(xtcIdlFactory, {
    agent,
    canisterId: xtcCanisterId,
  });
  return actor;
}
