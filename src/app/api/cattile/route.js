import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import { Category } from "../../../models/Category";

export async function GET(request, { params }) {
  connect();
  const searchParams = request.nextUrl.searchParams;
  const categoryId = searchParams.get('categoryId');

  try {
    // Use Mongoose to find the category by id
    const category = await Category.findById(categoryId).exec();

    if (!category) {
      return new NextResponse({ status: 404, body: { error: 'Category not found' } });
    }

    // If the category is found, construct the response object
    const responseCategory = {
      _id: category._id,
      name: category.name,
      properties: category.properties.map(property => ({
        _id: property._id,
        name: property.name,
        // other property fields if needed
      })),
    };

    console.log('Response Category:', responseCategory); // Log the responseCategory object

    return new NextResponse({ status: 200, body: JSON.stringify(responseCategory) });
  } catch (error) {
    console.error(error);
    return new NextResponse({ status: 500, body: { error: 'Internal Server Error' } });
  }
}
