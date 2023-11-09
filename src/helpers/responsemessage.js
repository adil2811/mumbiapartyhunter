import { NextResponse } from "next/server"


   const getResponseMessage = (messgae,statusCode,sucessStatus) => {
    return NextResponse.json(
        {
        messgae:messgae,
        statusCode:statusCode,
    },
    {
        sucessStatus:sucessStatus
    }
    );
};
export default (getResponseMessage)