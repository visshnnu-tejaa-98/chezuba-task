const colors = {
  1: "#DC2626",
  2: "#EA580C",
  3: "#D97706",
  4: "#65A30D",
  5: "#16A34A",
  6: "#059669",
  7: "#0891B2",
  8: "#0284C7",
  9: "#2563EB",
  10: "#7C3AED",
  11: "#C026D3",
  12: "#DB2777",
  13: "#334155",
  14: "#0C4A6E",
};

export const table_column_names = [
  {
    title: "Order Line ID",
    dataIndex: "OrderLineID",
    default: "ascend",
    sorter: (a, b) => a.OrderLineID - b.OrderLineID,
    render: (text) => <strong>{text}</strong>,
    width: 160,
    fixed: "left",
  },
  {
    title: "Order ID",
    dataIndex: "OrderID",
    sorter: (a, b) => a.OrderID - b.OrderID,
    width: 160,
  },
  {
    title: "Package Type ID",
    dataIndex: "PackageTypeID",
    width: 140,
    render: (text) => (
      <span
        className={`inline-block w-[1.5rem] h-[1.5rem] text-center bg-[${colors[text]}] rounded-full text-white`}
      >
        <span> {text}</span>
      </span>
    ),
  },
  {
    title: "Description",
    dataIndex: "Description",
    width: 400,
  },
  {
    title: "Quantity",
    dataIndex: "Quantity",
    sorter: (a, b) => a.Quantity - b.Quantity,
    width: 100,
  },
  {
    title: "Stock Item ID",
    dataIndex: "StockItemID",
    width: 100,
  },
  {
    title: "Unit Price",
    dataIndex: "UnitPrice",
    width: 100,
  },
];
