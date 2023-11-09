import { getResponseMessage } from "@/helpers/responsemessage";
import Event from "@/models/Event";
import { NextResponse } from "next/server";
import {connect} from "@/dbConfig/dbConfig";






// Your GET and PUT functions
export async function GET(request, { params }) {
    connect();
  
    console.log(params);
    const { userId } = params;
  
    try {
      const user = await Event.findById(userId);
      return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({
           message: error
        })        
    }
  }
  
  export async function PUT(request, { params }) {
    try {
      const { userId } = params;
      const { title, description, h1, category, price } = await request.json();
  
      console.log(title, description, h1, category, price);
      let event = await Event.findById(userId);
  
      event.title = title;
      event.description = description;
      event.h1 = h1;
      event.category = category;
      event.price = price; // Set the 'price' field
  
      const updatedEvent = await event.save();
      return NextResponse.json(updatedEvent);
    } catch (error) {
        return NextResponse.json({
            message: error
         })     }
  }
  

export async function DELETE(request,{params}){

    try{
        const { userId } = params;

        await Event.findByIdAndDelete(userId);
        return NextResponse.json("sucess")
    }
    catch(error){
        return NextResponse.json({
            message: error
         })     }

}