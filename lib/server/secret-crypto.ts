import "server-only";
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

const prefix = "v1";

export function hasSecretEncryptionKey() {
  try {
    return Boolean(readKey());
  } catch {
    return false;
  }
}

export function encryptSecret(value: string) {
  const key = readKey();
  if (!key) {
    throw new Error("CONFIG_ENCRYPTION_KEY is required before saving sensitive integration fields.");
  }

  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return [prefix, toBase64Url(iv), toBase64Url(tag), toBase64Url(encrypted)].join(":");
}

export function decryptSecret(value: string) {
  const key = readKey();
  if (!key) {
    throw new Error("CONFIG_ENCRYPTION_KEY is required before reading sensitive integration fields.");
  }

  const [version, iv, tag, encrypted] = value.split(":");
  if (version !== prefix || !iv || !tag || !encrypted) {
    throw new Error("Unsupported encrypted secret format.");
  }

  const decipher = createDecipheriv("aes-256-gcm", key, fromBase64Url(iv));
  decipher.setAuthTag(fromBase64Url(tag));
  return Buffer.concat([decipher.update(fromBase64Url(encrypted)), decipher.final()]).toString("utf8");
}

function readKey() {
  const raw = process.env.CONFIG_ENCRYPTION_KEY || process.env.INTEGRATION_ENCRYPTION_KEY;
  if (!raw) return null;

  const normalized = raw.trim();
  const buffer = decodeKey(normalized);

  if (buffer.length !== 32) {
    throw new Error("CONFIG_ENCRYPTION_KEY must decode to 32 bytes.");
  }

  return buffer;
}

function isLikelyHex(value: string) {
  return value.length === 64 && /^[a-f0-9]+$/i.test(value);
}

function decodeKey(value: string) {
  if (isLikelyHex(value)) return Buffer.from(value, "hex");
  if (Buffer.byteLength(value, "utf8") === 32 && !/[=+/]/.test(value)) return Buffer.from(value, "utf8");
  return Buffer.from(value.replace(/-/g, "+").replace(/_/g, "/"), "base64");
}

export function maskSecretPreview(value: string) {
  const trimmed = value.trim();
  if (trimmed.length <= 4) return "****";
  return `****${trimmed.slice(-4)}`;
}

function toBase64Url(buffer: Buffer) {
  return buffer.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string) {
  return Buffer.from(value.replace(/-/g, "+").replace(/_/g, "/"), "base64");
}
