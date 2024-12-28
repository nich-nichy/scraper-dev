import crypto from "crypto";
import "server-only"
const ALG = "aes-256-cbc";

// export const symmetricEncrypt = (data: string) => {
//     const key = process.env.ENCRYPTION_KEY;

//     if (!key) {
//         throw new Error("ENCRYPTION_KEY is not set");
//     }

//     const iv = crypto.randomBytes(16);
//     const cipher = crypto.createCipheriv(ALG, Buffer.from(key, "hex"), iv);

//     let encrypted = cipher.update(data);
//     encrypted = Buffer.concat([encrypted, cipher.final()]);
//     return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
// }

export const symmetricEncrypt = (data: string) => {
    const key = process.env.ENCRYPTION_KEY;

    if (!key) {
        throw new Error("ENCRYPTION_KEY is not set");
    }

    if (Buffer.from(key, "hex").length !== 32) { // Adjust for your algorithm
        throw new Error("Invalid ENCRYPTION_KEY length. Expected 32 bytes for aes-256-cbc");
    }

    const iv = crypto.randomBytes(16); // Initialization vector
    const cipher = crypto.createCipheriv(ALG, Buffer.from(key, "hex"), iv);

    let encrypted = cipher.update(data, "utf8");
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
};


export const symmetricDecrypt = (encrypted: string) => {
    const key = process.env.ENCRYPTION_KEY;
    if (!key) {
        throw new Error("ENCRYPTION_KEY is not set");
    }
    const textParts = encrypted.split(":");
    const iv = Buffer.from(textParts.shift() as string || "", "hex");
    const encryptedText = Buffer.from(textParts.join(":"), "hex");
    const decipher = crypto.createDecipheriv(ALG, Buffer.from(key, "hex"), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}