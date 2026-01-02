import { init } from "@paralleldrive/cuid2";
import { randomBytes } from "crypto";

// The init function returns a custom createId function with the specified
// configuration. All configuration properties are optional.

// Cryptographically secure replacement for Math.random with the same API.
// Returns a floating-point number in the range [0, 1).
const secureRandom = (): number => {
  const buf = randomBytes(4);
  const randomInt = buf.readUInt32BE(0);
  return randomInt / 0xffffffff;
};

export const createSlug = init({
  // A custom random function with the same API as Math.random.
  // You can use this to pass a cryptographically secure random function.
  random: secureRandom,
  // the length of the id
  length: 5,
  // A custom fingerprint for the host environment. This is used to help
  // prevent collisions when generating ids in a distributed system.
  fingerprint: "akb-crm-psxrmb5tszrjnn6znsqgmqkt",
});