import React, { useEffect, useState } from "react";
import Spin from "react-cssfx-loading/lib/Spin";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Order_read, Order_update } from "../../../slice/orderSlice";
import { SuccessMessage } from "../../../utils/util";

const OrderUpdatePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(state => state.order.loading);
  const [order, setOrder] = useState();

  const onSubmit = data => {
    const newStatus = {
      ...order,
      status: data.status,
    };
    dispatch(Order_update(newStatus))
      .unwrap()
      .then(() => {
        SuccessMessage("Cập nhật trạng thái thành công!");
        navigate("/admin/orders");
      });
  };

  useEffect(() => {
    dispatch(Order_read(id))
      .unwrap()
      .then(data => {
        setOrder(data);
        reset(data);
      });
  }, [id]);

  return (
    <>
      <div className="pb-[660px]">
        {loading === false ? (
          <div className="content-wrapper ">
            <div className="container mx-auto pt-5 text-center">
              <h3 className="text-center font-bold pb-4 text-xl">CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG</h3>

              <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
                <p className="mt-10 font-semibold">Trạng thái: </p>
                <select
                  {...register("status")}
                  className="form-control mx-auto mt-2"
                  id="status"
                  style={{ width: "200px" }}
                >
                  <option value="pending">Chưa duyệt</option>
                  <option value="success">Duyệt</option>
                  {order?.checkoutStatus !== "success" && <option value="cancel">Huỷ</option>}
                </select>
                <p className="error text-red-500 text-sm font-semibold" />
                <input
                  type="submit"
                  value="Cập nhật trạng thái"
                  name="btn_themdm"
                  className="px-3 py-2 text-white bg-red-600 rounded-full mt-4 mb-5 font-semibold hover:bg-red-700"
                />
              </form>
            </div>
            <div>
              <div className="text-center mt-2">
                <Link to="/admin/orders">
                  <button className="btn btn-primary" type="button">
                    Tất cả đơn hàng
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-[300px]">
            <Spin className="mx-auto" color="#0d6efd" width="30px" height="30px" />
          </div>
        )}
      </div>
    </>
  );
};

export default OrderUpdatePage;
