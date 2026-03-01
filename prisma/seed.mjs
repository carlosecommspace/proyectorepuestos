import "dotenv/config";
import bcrypt from "bcryptjs";
import { createRequire } from "node:module";
import Database from "better-sqlite3";
import { randomUUID } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, "..", "dev.db");
const db = new Database(dbPath);

function upsertSede(name, address) {
  const existing = db.prepare("SELECT id FROM Sede WHERE name = ?").get(name);
  if (existing) return existing;

  const id = randomUUID();
  db.prepare("INSERT INTO Sede (id, name, address, createdAt) VALUES (?, ?, ?, datetime('now'))").run(id, name, address);
  return { id };
}

async function upsertUser(email, name, password, role, sedeId) {
  const existing = db.prepare("SELECT id FROM User WHERE email = ?").get(email);
  if (existing) return existing;

  const id = randomUUID();
  const passwordHash = await bcrypt.hash(password, 10);
  db.prepare(
    "INSERT INTO User (id, email, name, passwordHash, role, sedeId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))"
  ).run(id, email, name, passwordHash, role, sedeId);
  return { id };
}

const sede1 = upsertSede("Sede Principal", "Av. Principal #123, Ciudad");
const sede2 = upsertSede("Sede Sucursal", "Calle Secundaria #456, Ciudad");

await upsertUser("admin@repuestos.com", "Administrador", "admin123", "admin", sede1.id);
await upsertUser("vendedor1@repuestos.com", "Vendedor Sede Principal", "vendedor123", "regular", sede1.id);
await upsertUser("vendedor2@repuestos.com", "Vendedor Sede Sucursal", "vendedor123", "regular", sede2.id);

db.close();

console.log("Seed completed successfully!");
console.log("\nCredenciales:");
console.log("  Admin: admin@repuestos.com / admin123");
console.log("  Vendedor 1 (Sede Principal): vendedor1@repuestos.com / vendedor123");
console.log("  Vendedor 2 (Sede Sucursal): vendedor2@repuestos.com / vendedor123");
