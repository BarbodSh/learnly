import React from "react";
import Navigation from "@/modules/panel/home/navigation";
import Course from "@/modules/panel/home/course";
import Ticket from "@/modules/panel/home/ticket";
import { getUserInformation } from "@/lib/backend/utils/helper";
import { getOrderForUser } from "@/lib/backend/utils/order";
import { getCommentForUser } from "@/lib/backend/utils/comment";
import { getTicketForUser } from "@/lib/backend/utils/ticket";
import { getWishlist } from "@/lib/backend/utils/wishList";
export const revalidate = 0;
async function page() {
  const user = await getUserInformation();

  const wishList = await getWishlist(user._id);
  const order = await getOrderForUser(user._id);
  const comment = await getCommentForUser(user._id);
  const ticket = await getTicketForUser(user._id);

  const courses = order.flatMap((order) => order.course);

  const wishListAmount = wishList?.length;
  const orderAmount = courses?.length;
  const commentAmount = comment?.length;
  const ticketAmount = ticket?.length;
  return (
    <div className=" p-5 dark:text-white">
      <Navigation
        wishListAmount={wishListAmount}
        courseAmount={orderAmount}
        ticketAmount={ticketAmount}
        commentAmount={commentAmount}
      />
      <Course userID={user._id} wishList={wishList} />
      <Ticket userID={user._id} />
    </div>
  );
}

export default page;
