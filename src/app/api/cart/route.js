import { connect } from "@/dbConfig/dbConfig";
import Event from "../../../models/Event";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

export async function POST(request) {
  try {
    // Establish a database connection
    await connect();

    // Get the IDs from the request body
    const { ids } = await request.json();

    // Check if the IDs variable is empty
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.error(400, "Invalid request body: `ids` must be a non-empty array of ObjectId strings.");
    }

    // Convert the `ids` array to ObjectId types
    const objectIdArray = ids.map(id => new Types.ObjectId(id));

    // Query the database for events with the specified IDs
    const events = await Event.find({ _id: { $in: objectIdArray } });

    // Respond with the retrieved events
    return NextResponse.json(events);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error:", error);
    return NextResponse.error("An error occurred while fetching events.");
  }
}
