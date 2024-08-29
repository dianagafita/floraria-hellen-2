export default function NewOrderReceiptEmail({ order }) {
  const subTotal = order.cart_total;
  const deliveryCost = order.shipping_fee;
  const recipientInfo = order.recipient_info;
  const senderInfo = order.sender_info;

  const formatDate = (dateStr) => {
    const reversedDateStr = dateStr.split("-").reverse().join("-");
    return reversedDateStr;
  };

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
            color: "black",
            margin: "0 auto",
          }}
        >
          <h1
            style={{ fontSize: "24px", fontWeight: "bold", color: "#333333" }}
          >
            COMANDA NOUA #{order.id}
          </h1>

          <div style={{ margin: "1rem 0" }}>
            <span
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "1rem ",
                color: "rgba(86, 12, 6, 0.9)",
              }}
            >
              DATE DESTINATAR{" "}
            </span>
            <div style={{ margin: "0.6rem 0", color: "black" }}>
              <strong>Oraș:</strong> {recipientInfo.deliveryCity}
              <br />
              <strong>Nume:</strong> {recipientInfo.personReceivingFullName}
              <br />
              <strong>Telefon:</strong> {recipientInfo.personReceivingPhone}
              <br />
              <strong>Adresa:</strong> {recipientInfo.deliveryCity},{" "}
              {recipientInfo.personReceivingStreetName}, nr.
              {recipientInfo.personReceivingStreetNumber}
            </div>
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <span
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "2rem ",
                color: "rgba(86, 12, 6, 0.9)",
              }}
            >
              DATE CONTACT CLIENT{" "}
            </span>
            <div style={{ margin: "0.6rem 0", color: "black" }}>
              <strong>Email:</strong> {senderInfo.personSendingEmail}
              <br />
              <strong>Telefon:</strong> {senderInfo.personSendingPhone}
              <br />
              <strong>Nume:</strong> {senderInfo.personSendingFirstName}{" "}
              {senderInfo.personSendingSecondName}
            </div>
            <div style={{ margin: "0.6rem 0", color: "black" }}>
              <strong>Livrare: </strong>
              {deliveryCost} lei
              <br />
              <strong>Pret comanda: </strong>
              {subTotal} lei
            </div>
          </div>

          <table
            style={{
              marginTop: "1rem",
              color: "#333333",
              width: "100%",
              borderCollapse: "collapse",
              borderSpacing: "0",
              boxSizing: "border-box",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    border: "1px solid #dddddd",
                    padding: "8px",
                    textAlign: "left",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  Produs
                </th>
                <th
                  style={{
                    border: "1px solid #dddddd",
                    padding: "8px",
                    textAlign: "left",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  Cant.
                </th>

                <th
                  style={{
                    border: "1px solid #dddddd",
                    padding: "8px",
                    textAlign: "left",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  Preț
                </th>
                <th
                  style={{
                    border: "1px solid #dddddd",
                    padding: "8px",
                    textAlign: "left",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  Livrare
                </th>
              </tr>
            </thead>
            <tbody>
              {order.order_items.map((item) => (
                <>
                  <tr key={item.id}>
                    <td
                      style={{
                        border: "1px solid #D0D0D0",
                        padding: "10px 8px",
                        fontSize: "11px",
                        verticalAlign: "middle",
                      }}
                    >
                      {item.product.name}
                    </td>

                    <td
                      style={{
                        border: "1px solid #D0D0D0",
                        padding: "10px 8px",
                        fontSize: "11px",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      x{item.quantity}
                    </td>
                    <td
                      style={{
                        border: "1px solid #D0D0D0",
                        padding: "10px 8px",
                        fontSize: "11px",
                        textAlign: "center",
                      }}
                    >
                      {item.product.price} RON
                    </td>
                    <td
                      style={{
                        border: "1px solid #D0D0D0",
                        padding: "10px 8px",
                        fontSize: "11px",
                        textAlign: "end",
                      }}
                    >
                      {item.productDeliveryInfo.map((info, index) => {
                        if (index === 1) {
                          return <p key={index}>{formatDate(info)}</p>;
                        } else if (index === 4) {
                          return (
                            <p key={index} colSpan="1">
                              {info === "true" ? "ANONIM" : "NON-ANONIM"}
                            </p>
                          );
                        } else if (index === 3) {
                          return;
                        } else {
                          return (
                            <p key={index} colSpan="1">
                              {info}
                            </p>
                          );
                        }
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan="1"
                      style={{
                        border: "1px solid #D0D0D0",
                        padding: "8px",
                        fontWeight: "bold",
                        textAlign: "left",
                        backgroundColor: "#f0f0f0",
                        borderTop: "2px solid #D0D0D0",
                      }}
                    >
                      <img
                        src={item.product.images_url[0]}
                        style={{
                          height: "6rem",
                          width: "4rem",
                          margin: "5px",
                          verticalAlign: "middle",
                        }}
                      />
                    </td>
                    <td
                      colSpan="3"
                      style={{
                        border: "1px solid #D0D0D0",
                        padding: "8px",
                        textAlign: "center",
                        fontSize: "15px",
                      }}
                    >
                      {item.product.flowers.map((item) => (
                        <p key={item.flower}>
                          x{item.quantity} {item.flower}
                        </p>
                      ))}
                    </td>
                  </tr>
                  {(item.extras || []).map((extra) => {
                    console.log(extra);
                    return (
                      <tr key={extra.id}>
                        <td
                          style={{
                            border: "1px solid #D0D0D0",
                            padding: "10px 8px",
                            fontSize: "11px",
                            verticalAlign: "middle",
                            backgroundColor: "#f0f0f0",
                          }}
                        >
                          <img
                            src={extra.image}
                            style={{
                              height: "6rem",
                              width: "4rem",
                              margin: "5px",
                              verticalAlign: "middle",
                            }}
                          />
                        </td>
                        <td
                          style={{
                            border: "1px solid #D0D0D0",
                            padding: "10px 8px",
                            fontSize: "11px",
                            textAlign: "center",
                          }}
                        >
                          x{extra.quantity}
                        </td>
                        <td
                          style={{
                            border: "1px solid #D0D0D0",
                            padding: "10px 8px",
                            fontSize: "12px",
                            textAlign: "center",
                          }}
                        >
                          {extra.price} RON
                        </td>
                        <td
                          style={{
                            border: "1px solid #D0D0D0",
                            padding: "10px 8px",
                            fontSize: "12px",
                            textAlign: "center",
                          }}
                        >
                          {extra.name}
                        </td>
                      </tr>
                    );
                  })}

                  <tr>
                    <td
                      colSpan="1"
                      style={{
                        border: "1px solid #D0D0D0",
                        padding: "10px 8px",
                        fontSize: "11px",
                        verticalAlign: "middle",
                        backgroundColor: "#f0f0f0",
                        fontWeight: "bold",
                      }}
                    >
                      Mesaj felicitare
                    </td>
                    <td
                      colSpan="3"
                      style={{
                        border: "1px solid #D0D0D0",
                        padding: "10px 8px",
                        fontSize: "11px",
                        textAlign: "center",
                      }}
                    >
                      {item.productDeliveryInfo.map((info, index) => {
                        if (index === 3) {
                          return (
                            <p key={index}>
                              {info === "" ? "FARA MESAJ" : info}
                            </p>
                          );
                        }
                      })}
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </body>
    </html>
  );
}
