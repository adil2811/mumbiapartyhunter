import { connect } from "@/dbConfig/dbConfig";
import Event from "../../../models/Event";

export async function GET(request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const searchQuery = searchParams.get('searchQuery');

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
      // Return an error Response if no events were found
      return Response.status(404).json({
        message: "No verified events found",
        error: true,
      });
    }

    return Response.status(200).json(events); // Return events with a success status
  } catch (error) {
    console.error(error);
    // Handle errors gracefully
    return Response.status(500).json({
      message: "An error occurred",
      error: true,
    });
  }
}
