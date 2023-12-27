import Event from "../../../models/Event";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

export async function GET(request, response) {
  connect();

  try {
    // Assuming your Event model has a property called isVerify
    const verifiedEvents = await Event.find({ isVerify: true });

    // Handle the response with the verified events
    return NextResponse.json(verifiedEvents);
  } catch (error) {
    // Handle errors
    return NextResponse.error(error);
  }
}
