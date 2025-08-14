"use client";
import InformationAboutItem from "@/templates/shoppingCart/informationAboutItem";
import ShopSidebar from "@/templates/shoppingCart/shopSidebar";
import { getMe, showErrorSwal, showSuccessSwal } from "@/frontend/utils/helper";
import { useDiscunt } from "@/frontend/utils/shopingCart";
import React, { useEffect, useState } from "react";
import { allStatus } from "@/frontend/utils/status";
import { validateCode } from "@/validator/discunt";

function ShoppingCart() {
  const [discunt, setDiscunt] = useState(0);
  const [user, setUser] = useState(null);

  const useDiscuntHandler = async (discunt) => {
    const validate = validateCode(discunt);
    if (validate !== true) {
      return showErrorSwal(validate);
    }

    const res = await useDiscunt(discunt);
    if (res.status === 200) {
      const data = await res.json();
      setDiscunt(data.findDiscunt.percent);
      return showSuccessSwal("apply discount is successfully");
    }
    if (res.status === 422) {
      return showErrorSwal("Discount expired..");
    }

    const resStatus = allStatus(res);
    return resStatus;
  };

  useEffect(() => {
    getMe(setUser);
  }, []);

  return (
    <div className="container">
      <div className="grid grid-cols-12 justify-between content-center gap-5">
        <div className="col-span-4 ">
          <ShopSidebar discunt={discunt} userID={user?.id} />
        </div>
        <div className="col-span-8">
          <InformationAboutItem useDiscunt={useDiscuntHandler} />
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
