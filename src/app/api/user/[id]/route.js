import Event from "@/models/Event";
import { NextResponse } from "next/server";


export async function GET(request,{params}){


    const {id} = params;
    try {
        
        const event = await Event.find({userId :id})

        return NextResponse.json(event)

    } catch (error) {
        return NextResponse.json({
            message:"failed to create"+error,
            sucess: false,
        });
    }
}
export async function PUT(request, { params }) {
    const { id } = params;
  
    try {
      const { title, description, h1, category } = await request.json();
  
      let event = await Event.findOne({ userId: id });
  
      if (!event) {
        return new Response("Event not found", { status: 404 });
      }
  
      event.title = title;
      event.description = description;
      event.h1 = h1;
      event.category = category;
  
      const updateEvent = await event.save();
  
      return new Response(JSON.stringify(updateEvent), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({
        message: "Failed to update: " + error,
        success: false,
      }), {
        status: 500, 
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }
  