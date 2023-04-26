const express=require("express");
const {PrismaClient}=require("@prisma/client");
const cors=require("cors")
const {Pool}=require("pg")

const prisma=new PrismaClient();
const app=express();

app.use(cors());
app.use(express.json())
const port=3001;
app.listen(port,()=>"Server is running")

// create db model
const pool=new Pool({
    user:"postgres",
    host:"localhost",
    database:"crudDB",
    password:"post",
    port:3003
})

const createUserTable=async()=>{
    const client=await pool.connect();
    try {
        await client.query(
            `
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                email VARCHAR(255) UNIQUE,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            )
            `
        )
        console.log(`table created successfully`)
    } catch (error) {
        console.log("from error",error);
    }
}
createUserTable()