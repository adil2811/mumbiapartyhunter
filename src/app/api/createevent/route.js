import {connect} from "@/dbConfig/dbConfig";

import { NextResponse } from "next/server"
import Event from "../../../models/Event"
import getResponseMessage from '@/helpers/responsemessage.js'

export async function POST(request){

    connect()
    const {title , description ,h1 , images , userId, category} = await request.json()


    try {   
         const createevent = new Event({
            title,
            description,
            h1,
            images,
            userId, 
            category,
         })
        const event = await createevent.save()
         
         
         return NextResponse.json(event,{
            status:201,
         })
        
    } catch (error) {
        return NextResponse.json({
            message:"failed to create"+error,
            sucess: false,
        });
    }



}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract and validate query parameters efficiently
    const { page = 1, limit = 2, category, sort = 'price', order = 'asc' } = Object.fromEntries(
      Array.from(searchParams.entries())
        .filter(([key]) => key in ['page', 'limit', 'category', 'sort', 'order'])
        .map(([key, value]) => [key, value === '' ? undefined : value])
    );

    // Validate parameters with early returns for errors
    if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
      return getResponseMessage("Invalid page or limit query parameters", 400, false);
    }
    if (order !== 'asc' && order !== 'desc') {
      return getResponseMessage("Invalid order parameter. Use 'asc' or 'desc'.", 400, false);
    }

    const skip = (page - 1) * limit;
    const filter = {
      ...(category ? { category } : {}), // Use optional chaining for conciseness
      isVerified: true,
    };
    const sortObject = { [sort]: order === 'asc' ? 1 : -1 }; // Direct object property syntax

    const events = await Event.find(filter)
      .sort(sortObject)
      .skip(skip)
      .limit(limit);

    return NextResponse.json(events);
  } catch (error) {
    console.log(error);
    return getResponseMessage("Error fetching events", 500, false);
  }
}


