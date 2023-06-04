const React = require("react");
const { useState, useEffect } = require("react");
const axios = require("axios");
const toast = require("react-hot-toast");
const AdminMenu = require("../../components/Layout/AdminMenu");
const Layout = require("../../components/Layout/Layout");
const { useAuth } = require("../../context/auth");
const moment = require("moment");
const { Select } = require("antd");
const { Option } = Select;

const AdminOrders = () => {
  const [statusOptions, setStatusOptions] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Canceled",
  ]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  const handleChangeStatus = async (orderId, value) => {
    try {
      await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
      toast.success("Order status updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update order status");
    }
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {orders.map((order, index) => (
            <div className="border shadow" key={order._id}>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Status</th>
                    <th scope="col">Buyer</th>
                    <th scope="col">Date</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <Select
                        bordered={false}
                        onChange={(value) =>
                          handleChangeStatus(order._id, value)
                        }
                        value={order?.status}
                      >
                        {statusOptions.map((status, index) => (
                          <Option key={index} value={status}>
                            {status}
                          </Option>
                        ))}
                      </Select>
                    </td>
                    <td>{order?.buyer?.name}</td>
                    <td>{moment(order?.createdAt).fromNow()}</td>
                    <td>{order?.payment.success ? "Success" : "Failed"}</td>
                    <td>{order?.products?.length}</td>
                  </tr>
                </tbody>
              </table>
              <div className="container">
                {order?.products?.map((product) => (
                  <div
                    className="row mb-2 p-3 card flex-row"
                    key={product._id}
                  >
                    <div className="col-md-4">
                      <img
                        src={`/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top"
                        alt={product.name}
                        width                    ="100px"
                        height="100px"
                      />
                    </div>
                    <div className="col-md-8">
                      <p>{product.name}</p>
                      <p>{product.description.substring(0, 30)}</p>
                      <p>Price: {product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
                }    
                export default AdminOrders;