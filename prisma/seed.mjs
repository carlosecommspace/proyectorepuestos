import "dotenv/config";
import bcrypt from "bcryptjs";
import pg from "pg";
import { randomUUID } from "node:crypto";

const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

await client.connect();

async function upsertSede(name, address) {
  const existing = await client.query("SELECT id FROM \"Sede\" WHERE name = $1", [name]);
  if (existing.rows.length > 0) return existing.rows[0];

  const id = randomUUID();
  await client.query(
    "INSERT INTO \"Sede\" (id, name, address, \"createdAt\") VALUES ($1, $2, $3, NOW())",
    [id, name, address]
  );
  return { id };
}

async function upsertUser(email, name, password, role, sedeId) {
  const existing = await client.query("SELECT id FROM \"User\" WHERE email = $1", [email]);
  if (existing.rows.length > 0) return existing.rows[0];

  const id = randomUUID();
  const passwordHash = await bcrypt.hash(password, 10);
  await client.query(
    "INSERT INTO \"User\" (id, email, name, \"passwordHash\", role, \"sedeId\", \"createdAt\", \"updatedAt\") VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())",
    [id, email, name, passwordHash, role, sedeId]
  );
  return { id };
}

const sede1 = await upsertSede("Sede Principal", "Av. Principal #123, Ciudad");
const sede2 = await upsertSede("Sede Sucursal", "Calle Secundaria #456, Ciudad");

await upsertUser("admin@repuestos.com", "Administrador", "Ronaldadmin", "admin", sede1.id);
await upsertUser("vendedorrl@repuestos.com", "Vendedor RL", "vendedor542", "regular", sede1.id);
await upsertUser("vendedorrl2@repuestos.com", "Vendedor RL2", "vendedor321", "regular", sede2.id);
await upsertUser("vendedorca@repuestos.com", "Vendedor CA", "vendedor987", "regular", sede1.id);
await upsertUser("vendedorca2@repuestos.com", "Vendedor CA2", "vendedor656", "regular", sede2.id);

await client.end();

console.log("Seed completed successfully!");
console.log("\nCredenciales:");
console.log("  Admin: admin@repuestos.com / Ronaldadmin");
console.log("  Vendedor 1: vendedorrl@repuestos.com / vendedor542");
console.log("  Vendedor 2: vendedorrl2@repuestos.com / vendedor321");
console.log("  Vendedor 3: vendedorca@repuestos.com / vendedor987");
console.log("  Vendedor 4: vendedorca2@repuestos.com / vendedor656");
