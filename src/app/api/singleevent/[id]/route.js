import { NextResponse } from "next/server";
import Event from "../../../../models/Event";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(request, { params }) {
  connect()
  try {
    
    const { id } = params;
    // Get the event ID from the query parameters
    console.log('thisis',id)
    // Find the event by ID
    const event = await Event.findById(id);

    // If the event is not found, return a 404 error
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Return the event
    return NextResponse.json(event);
  } catch (error) {
    // Return a 500 error if an internal server error occurs
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
