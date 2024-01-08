import { connect } from "@/dbConfig/dbConfig";
import Event from "../../../models/Event";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

export async function POST(request) {
  try {
    await connect();

    const { ids } = await request.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.error(400, "Invalid request body: `ids` must be a non-empty array of ObjectId strings.");
    }

    const objectIdArray = ids.map(id => new Types.ObjectId(id));

    const events = await Event.find({ _id: { $in: objectIdArray } });

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("An error occurred while fetching events.");
  }
}
