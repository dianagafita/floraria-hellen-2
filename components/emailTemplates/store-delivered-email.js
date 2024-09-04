export default function StoreDeliveredEmail({ order }) {
  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}.${month}.${year}`;
  };

  const formattedDate = formatDate(order.created_at || new Date());

  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        style={{
          overflowX: "auto",
          fontFamily: "Arial, sans-serif",
          margin: 0,
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            boxSizing: "border-box",
            width: "100%",
            margin: "0 auto",
          }}
        >
          <h1
            style={{ fontSize: "24px", fontWeight: "bold", color: "#333333" }}
          >
            Comanda nr.{order.id} ({formattedDate}) a fost livrata!
          </h1>
        </div>
      </body>
    </html>
  );
}
