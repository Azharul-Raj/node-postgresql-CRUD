const express=require("express");
const {PrismaClient}=require("@prisma/client");
const cors=require("cors")

const prisma=new PrismaClient();
const app=express();