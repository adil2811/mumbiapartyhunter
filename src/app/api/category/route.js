import { connect } from "@/dbConfig/dbConfig";
import Event from "../../../models/Event";
import { NextResponse } from "next/server";

export async function GET(request) {
  connect(); // Ensure this establishes a connection to the database

  try {
    const { query: e = {} } = request; // Destructuring with default empty object
    const { category, price } = e;

    // Validate input data
    if (!category && !price) {
      throw new Error("Please provide valid category or price");
    }

    // Define an initial query object
    const query = {};

    if (category !== undefined && category !== '') {
      query.category = category; // Add category filter if it exists and is not empty
    }

    if (price !== undefined && price !== '') {
      const parsedPrice = parseInt(price, 10);
      if (isNaN(parsedPrice)) {
        throw new Error("Invalid price format");
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
