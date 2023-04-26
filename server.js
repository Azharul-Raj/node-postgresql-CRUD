const express=require("express");
const {PrismaClient}=require("@prisma/client");
const cors=require("cors")
// const {Pool}=require("pg")

const prisma=new PrismaClient();
const app=express();

app.use(cors());
app.use(express.json())
const port=3001;
app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})

// create db model
// const pool=new Pool({
//     user:"postgres",
//     host:"localhost",
//     database:"textdatabase",
//     password:"post",
//     port:5432
// })

// const createUserTable=async()=>{
//     const client=await pool.connect();
//     try {
//         await client.query(
//             `
//             CREATE TABLE users (
//                 id SERIAL PRIMARY KEY,
//                 name VARCHAR(255),
//                 email VARCHAR(255) UNIQUE,
//                 created_at TIMESTAMP DEFAULT NOW(),
//                 updated_at TIMESTAMP DEFAULT NOW()
//             )
//             `
//         )
//         console.log(`table created successfully`)
//     } catch (error) {
//         console.log("from error",error);
//     }
// }
// createUserTable()

//routing
app.post('/add',async(req,res)=>{
    const data=req.body;
    try {       
            const user = await prisma.user.create({
                data: data
              });
              
        res.status(200).send(user)
    } catch (error) {
        res.send(error.message)
    }
})
app.get("/",async(req,res)=>{
    try {
        const users=await prisma.user.findMany()
    res.status(200).json(users)
    } catch (error) {
        res.status(500).json(`${error.message}`)
    }
})