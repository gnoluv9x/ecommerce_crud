import React from "react";
import { useSelector } from "react-redux";
import checkoutLogo from "../../../../assets/images/checkout.svg";
import priceLogo from "../../../../assets/images/revenue.svg";
import { formatVND } from "../helper";

const DashboardSummary = () => {
  const { data: dataSummary } = useSelector(state => state.dashboard.summary);

  return (
    <div className="flex justify-center gap-4">
      <div className="w-[256px]">
        <div className="box-item p-3 rounded shadow bg- flex gap-2 items-center">
          <div className="img-wrapper relative flex justify-center items-center flex-shrink-0 w-10 h-10">
            <img src={checkoutLogo} alt="logo" className="absolute w-8 h-8 object-cover" />
          </div>
          <div className="info">
            <div className="font-bold text-lg">{dataSummary?.totalOrders || 0}</div>
            <div className="font-normal text-base text-gray-400">Đơn hàng</div>
          </div>
        </div>
      </div>
      <div className="w-[256px]">
        <div className="box-item p-3 rounded shadow bg- flex gap-2 items-center">
          <div className="img-wrapper relative flex justify-center items-center flex-shrink-0 w-10 h-10">
            <img src={priceLogo} alt="logo" className="absolute w-8 h-8 object-cover" />
          </div>
          <div className="info">
            <div className="font-bold text-lg">{formatVND(dataSummary?.totalPrice) || 0} ₫</div>
            <div className="font-normal text-base text-gray-400">Tổng trị giá</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
