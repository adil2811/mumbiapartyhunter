import Event from "../../../../models/Event";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";




export async function GET(request,response) {
  connect();
  try {
    
    console.log(response.params.search)
    const { search } = response.params; // Use request.params instead of response.params
console.log('✌️search --->', search);
const splitSearch = search.split('=');
const searchQuery = splitSearch[1]; // Getting the value after '='


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
          { isVerified: true }, // Only fetch events that are verified
        ],
      });
    } else {
      events = await Event.find({ isVerified: true }); // Fetch only verified events if no search query is provided
    }

    if (!events || events.length === 0) {
      // Return an error response if no events were found
      return NextResponse.json({
        message: "No verified events found",
        error: true,
      });
    }

    return NextResponse.json(events); // Return a new Response object
console.log('✌️events --->', events);
  } catch (error) {
    console.error(error);
    // Handle errors gracefully
    return NextResponse.json({
      message: "An error occurred",
      error: true,
    });
  }
}