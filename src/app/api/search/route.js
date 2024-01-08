
import { connect } from "@/dbConfig/dbConfig";
import Event from "@/models/Event";
import { NextResponse } from "next/server";

export async function GET(request, response) {
  connect();

  try {
    console.log('eventhit')
    const verifiedEvents = await Event.find({ isVerified: true });

    return NextResponse.json(verifiedEvents);
  } catch (error) {
    return NextResponse.error(error);
  }
}
