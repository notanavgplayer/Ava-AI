import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  const body = await req.json();
  const { id } = body;
  const { userId } = auth();
  const currentDate = new Date();
  let subscriptionPeriodEnd = new Date(currentDate);
  subscriptionPeriodEnd.setDate(currentDate.getDate() + 30);
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    await prismadb.userSubscription.create({
      data: {
        userId,
        subscriptionID: id,
        subscriptionPeriodEnd,
      },
    });
  } catch (error: any) {
    return new NextResponse(`Network Error: ${error.message}`, { status: 400 });
  }

  return new NextResponse("ok", { status: 200 });
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const currentUserSubscription = await prismadb.userSubscription.findUnique({
    where: {
      userId,
    },
  });

  if (!currentUserSubscription) {
    return new NextResponse("You are not subscribed", { status: 400 });
  }

  try {
    const res = await fetch(
      `https://api-m.paypal.com/v1/billing/subscriptions/${currentUserSubscription.subscriptionID}/cancel`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYPAL_CLIENT_ID}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ reason: "Not satisfied with the service" }),
      }
    );

    if (res.status === 204) {
      await prismadb.userSubscription.delete({
        where: {
          userId,
        },
      });
    }

    return new NextResponse("Successfully unsubscribed", { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Network Error: ${error.message}`, {
      status: 400,
    });
  }
}
