import Header from "@/templates/homePage/header";
import Main from "@/templates/homePage/main";
import Navbar from "@/modules/navbar/navbar";
import About from "@/templates/homePage/about";
import courseModel from "@/models/course";
import Footer from "@/components/modules/footer/footer";
import WhyChoose from "@/components/templates/homePage/whyChoose";
import connectToDB from "@/lib/backend/configs/db";
import CourseSwipperIsClient from "@/components/templates/homePage/courseSwipperIsClient";
import { getUserInformation } from "@/lib/backend/utils/helper";
import { getWishlist } from "@/lib/backend/utils/wishList";

export default async function Home() {
  await connectToDB();
  const resCourse = await courseModel.find({}).sort({ _id: -1 });
  const courses = JSON.parse(JSON.stringify(resCourse));
  const user = await getUserInformation();
  const wishList = await getWishlist(user._id);
  return (
    <>
      <Navbar />
      <div className="bg-[url('/images/hero-section.webp')] -mt-24 pt-5 min-h-210 bg-no-repeat pb-10 bg-cover bg-bottom relative">
        <Header />
      </div>
      <Main courses={courses} wishList={wishList} />
      <WhyChoose />
      <CourseSwipperIsClient wishList={wishList} />
      <About />
      <Footer />
    </>
  );
}
