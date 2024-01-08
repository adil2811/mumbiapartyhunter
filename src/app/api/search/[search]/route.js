import Event from "../../../../models/Event";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

export async function GET(request, response) {
  connect();
  try {
    const { search } = response.params; // Use request.params instead of response.params

    console.log('✌️search --->', search);
    const splitSearch = search ? search.split('=') : [];
    const searchQuery = splitSearch.length > 1 ? splitSearch[1] : undefined; // Getting the value after '='

    console.log('✌️searchQuery --->', searchQuery);

    let events;

    if (searchQuery) {
      events = await Event.find({
        $and: [
          {
            $or: [
              { title: { $regex: new RegExp(searchQuery, "i") } },
              { description: { $regex: new RegExp(searchQuery, "i") } },
            ],
          },
          { isVerified: true }, 
        ],
      });
    } else {
      events = await Event.find({ isVerified: true }); 
    }

    if (!events || events.length === 0) {
      return NextResponse.json({
        message: "No verified events found",
        error: true,
      });
    }

    console.log('✌️events --->', events);
    return NextResponse.json(events); 
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "An error occurred",
      error: true,
    });
  }
}
