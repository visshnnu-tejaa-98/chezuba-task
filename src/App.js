import "./App.css";
import { useEffect, useState } from "react";
import { Table } from "antd";
import { Select, Space, Input } from "antd";
import { table_column_names } from "./utils/constants";
import { generateOrderLines } from "./utils/utilityFunctions";
import { worker } from "./utils/app.worker";
import WebWorker from "./utils/webWorker";

function App() {
  const [orderlinesData, setOrderlinesData] = useState({
    apiStatus: 0,
    data: null,
    error: null,
  });
  const [orderLine, setOrderLine] = useState(1);
  const [quantity, setQuantity] = useState();
  const { Search } = Input;
  const webWorker = new WebWorker(worker);

  const onSearchByQuantity = (value, _e) => {
    setQuantity(value);
  };

  useEffect(() => {
    getData();
  }, [orderLine, quantity]);

  useEffect(() => {
    const webWorker = new WebWorker(worker);
    webWorker.postMessage([1, quantity]);
    return () => {
      webWorker.terminate();
    };
  }, []);

  const handleOrderLineChange = (value) => {
    setOrderLine(value);
  };
  const getData = async () => {
    try {
      setOrderlinesData({
        apiStatus: 0,
        data: null,
        error: null,
      });
      webWorker.postMessage([orderLine, quantity]);
      webWorker.addEventListener("message", (e) => {
        let res = e.data;
        setOrderlinesData({
          apiStatus: 1,
          data: res,
          error: null,
        });
      });
    } catch (err) {
      console.log(err);
      setOrderlinesData({
        apiStatus: -1,
        data: null,
        error: err?.message,
      });
    }
  };

  return (
    <div className="w-[80%] mx-auto">
      <p className="text-3xl text-center my-5">Minizuba</p>
      {/* Drop down for selecting orderlines*/}
      <div className="md:flex md:justify-between">
        <div className="my-3">
          <span className="text-sm">Type of OrderLine: </span>
          <Space wrap className="py-2">
            <Select
              defaultValue="1"
              style={{
                width: 130,
              }}
              onChange={handleOrderLineChange}
              options={generateOrderLines()}
            />
          </Space>
        </div>
        {/* Search bar to filter by quantity */}
        <div className="my-3">
          <span className="text-sm">Filter By Quantity: </span>
          <Space wrap className="py-2">
            <Search
              placeholder="Filter By Quantity"
              onSearch={onSearchByQuantity}
              style={{
                width: 200,
              }}
              allowClear
            />
          </Space>
        </div>
      </div>

      {/* table */}
      {orderlinesData.apiStatus === 1 && (
        <Table
          columns={table_column_names}
          dataSource={orderlinesData?.data}
          // onChange={onChange}
          pagination={{ defaultPageSize: 20 }}
          scroll={{ y: 400, x: 500 }}
        />
      )}

      {/* Loader */}
      {orderlinesData.apiStatus === 0 && (
        <div className="h-[350px] w-[100%]">
          <div className="flex h-[350px] justify-center items-center">
            <div class="loader"></div>
          </div>
        </div>
      )}
      {/* Error */}
      {orderlinesData.apiStatus === -1 && (
        <div className="h-[350px] w-[100%]">
          <div className="flex h-[350px] justify-center items-center">
            <span>Something went wrong</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
