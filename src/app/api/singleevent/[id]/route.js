import { NextResponse } from "next/server";
import Event from "../../../../models/Event";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(request, { params }) {
  connect()
  try {
    
    const { id } = params;
    console.log('thisis',id)
    // Find the event by ID
    const event = await Event.findById(id);

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
