import { NextResponse } from "next/server";
import { listPosts } from "@/lib/boards";
export async function GET(request:Request){const u=new URL(request.url);const result=await listPosts("resource",{query:u.searchParams.get("q")||undefined,category:u.searchParams.get("category")||undefined,page:Number(u.searchParams.get("page"))||1,pageSize:12});return NextResponse.json(result)}
