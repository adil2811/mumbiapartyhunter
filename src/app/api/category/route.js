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

    // Sanitize and validate inputs before using in the query
    const validatedQuery = validateAndSanitizeQuery(query);

    const events = await Event.find(validatedQuery);

    return new NextResponse.JSON(events);
  } catch (error) {
    if (error.message === "Please provide valid category or price") {
      return new NextResponse.JSON({ error: error.message }, { status: 400 }); // Return 400 for bad request
    } else if (error.message === "Invalid price format") {
      return new NextResponse.JSON({ error: error.message }, { status: 400 });
    } else {
      console.error(error);
      return new NextResponse.JSON({ error: "An unexpected error occurred" }, { status: 500 });
    }
  }
}

function validateAndSanitizeQuery(query) {
  // Implement your validation and sanitization logic here
  // Make sure to handle all user inputs and sanitize them properly
  // For instance, you might use a library like validator.js for validation
  // and escape/sanitize user inputs to prevent injection attacks
  // Example: Sanitization and validation for MongoDB query
  const sanitizedQuery = {};

  if (query.category) {
    sanitizedQuery.category = query.category.toString(); // Assuming category is a string
  }

  if (query.price) {
    const parsedPrice = parseInt(query.price, 10);
    if (!isNaN(parsedPrice)) {
      sanitizedQuery.price = { $lte: parsedPrice };
    }
  }

  return sanitizedQuery;
}
