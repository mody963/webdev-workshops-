import * as crypto from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(crypto.scrypt);

export async function hashPassword(password: string) {
    // 1. Generate a unique, random salt with a length of 16 bytes
    const salt = crypto.randomBytes(16).toString('hex');

    // 2. Derive the key. The result is raw data (a Buffer).
    // 64 bytes is the final size of our hash
    const derivedKeyRaw = await scryptAsync(password, salt, 64) as Buffer;

    // 3. Convert the raw data (Buffer) into a readable Hex String for storage.
    const hashHex = derivedKeyRaw.toString('hex');

    // 4. Put the salt and the hash together, separated by a colon (:)
    return `${salt}:${hashHex}`;
}
