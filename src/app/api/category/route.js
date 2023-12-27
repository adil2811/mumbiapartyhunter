import { connect } from "@/dbConfig/dbConfig";
import Event from "../../../models/Event";
import { NextResponse } from "next/server";

export async function GET(request) {
  connect();
  try {
    const { category, price } = request.query;

    // Validate input data
    if (!category && !price) {
      return new NextResponse.Error("Please provide valid category or price", 400);
    }

    // Define an initial query object
    const query = {};

    if (category) {
      query.category = category; // Add category filter
    }

    if (price) {
      const parsedPrice = parseInt(price, 10);
      if (isNaN(parsedPrice)) {
        return new NextResponse.Error("Invalid price format", 400);
      }
      query.price = { $lte: parsedPrice }; // Add price filter (e.g., less than or equal)
    }

    const events = await Event.find(query);

    return new NextResponse.JSON(events);
  } catch (error) {
    console.error(error);
    return new NextResponse.Error("An error occurred", 500);
  }
}
