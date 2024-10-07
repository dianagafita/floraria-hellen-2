export default function OrderReceiptEmail({ order }) {
  const subTotal = order.cart_total || 0;
  const deliveryCost = order.shipping_fee || 0;
  const total = order.total_price || 0;
  const recipientInfo = order.recipient_info || {};
  const senderInfo = order.sender_info || {};

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
            Comanda plasată si platita cu succes.
          </h1>
          <p>Buna {senderInfo.personSendingEmail},</p>
          <p>Vă mulțumim pentru comanda dvs. Aici sunt detaliile comenzii:</p>
          <p
            style={{
              fontWeight: "600",
              fontSize: "17px",
              color: "rgba(86, 12, 6, 0.9)",
            }}
          >
            [Comanda nr.{order.id}] ({formattedDate})
          </p>
          <table
            style={{
              marginTop: "1rem",
              color: "#606060",
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
              {(order.order_items || []).map((item) => (
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
                      <div
                        style={{
                          display: "inline-block",
                          verticalAlign: "middle",
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
                      </div>
                      <div
                        style={{
                          display: "inline-block",
                          verticalAlign: "middle",
                        }}
                      >
                        <p style={{ marginLeft: "5px", display: "inline" }}>
                          {item.product.name}
                        </p>
                      </div>
                    </td>

                    <td
                      style={{
                        border: "1px solid #D0D0D0",
                        padding: "10px 8px",
                        fontSize: "11px",
                        textAlign: "center",
                      }}
                    >
                      {item.quantity}
                    </td>
                    <td
                      style={{
                        border: "1px solid #D0D0D0",
                        padding: "10px 8px",
                        fontSize: "12px",
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
                        textAlign: "center",
                        whiteSpace: "nowrap",
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
                  {(item.extras || []).map((extra) => (
                    <tr key={extra.id}>
                      <td
                        style={{
                          border: "1px solid #D0D0D0",
                          padding: "10px 8px",
                          fontSize: "11px",
                          verticalAlign: "middle",
                        }}
                      >
                        <div
                          style={{
                            display: "inline-block",
                            verticalAlign: "middle",
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
                        </div>
                        <div
                          style={{
                            display: "inline-block",
                            verticalAlign: "middle",
                          }}
                        >
                          <p style={{ marginLeft: "5px", display: "inline" }}>
                            {extra.name}
                          </p>
                        </div>
                      </td>
                      <td
                        style={{
                          border: "1px solid #D0D0D0",
                          padding: "10px 8px",
                          fontSize: "11px",
                          textAlign: "center",
                        }}
                      >
                        {extra.quantity}
                      </td>
                      <td
                        colSpan="2"
                        style={{
                          border: "1px solid #D0D0D0",
                          padding: "10px 8px",
                          fontSize: "12px",
                          textAlign: "center",
                        }}
                      >
                        {extra.price} RON
                      </td>
                    </tr>
                  ))}
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
                  <td
                    colSpan="4"
                    style={{
                      padding: "0.5px",
                      backgroundColor: "#D0D0D0",
                    }}
                  />
                </>
              ))}
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
                  Sub-total:
                </td>
                <td
                  colSpan="3"
                  style={{
                    border: "1px solid #D0D0D0",
                    padding: "8px",
                    textAlign: "center",
                    fontSize: "11px",
                  }}
                >
                  {subTotal} LEI
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
                  }}
                >
                  Livrare:
                </td>
                <td
                  colSpan="3"
                  style={{
                    border: "1px solid #D0D0D0",
                    padding: "8px",
                    fontSize: "11px",
                    textAlign: "center",
                  }}
                >
                  {deliveryCost} LEI
                </td>
              </tr>
              <tr>
                <td
                  colSpan="1"
                  style={{
                    border: "1px solid #D0D0D0",
                    padding: "8px",
                    fontWeight: "bold",
                    backgroundColor: "#f0f0f0",
                    textAlign: "left",
                  }}
                >
                  Total:
                </td>
                <td
                  colSpan="3"
                  style={{
                    border: "1px solid #D0D0D0",
                    padding: "8px",
                    fontSize: "11px",
                    textAlign: "center",
                  }}
                >
                  {total} LEI
                </td>
              </tr>
            </tbody>
          </table>

          <div style={{ margin: "1rem 0" }}>
            <span
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "1rem ",
                color: "rgba(86, 12, 6, 0.9)",
              }}
            >
              Informatii despre livrare
            </span>
            <div style={{ margin: "0.6rem 0", color: "black" }}>
              <strong>Oraș:</strong> {recipientInfo.deliveryCity || "N/A"}
              <br />
              <strong>Nume:</strong>{" "}
              {recipientInfo.personReceivingFullName || "N/A"}
              <br />
              <strong>Telefon:</strong>{" "}
              {recipientInfo.personReceivingPhone || "N/A"}
              <br />
              <strong>Cod poștal:</strong>{" "}
              {recipientInfo.personReceivingPostalCode || "N/A"}
              <br />
              <strong>Stradă:</strong>{" "}
              {recipientInfo.personReceivingStreetName || "N/A"}
              <br />
              <strong>Număr:</strong>{" "}
              {recipientInfo.personReceivingStreetNumber || "N/A"}
            </div>
          </div>
          <div style={{ margin: "0.6rem 0" }}>
            <span
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "1rem ",
                color: "rgba(86, 12, 6, 0.9)",
              }}
            >
              Informatiile de contact
            </span>
            <div style={{ margin: "0.6rem 0", color: "black" }}>
              <strong>Email:</strong> {senderInfo.personSendingEmail || "N/A"}
              <br />
              <strong>Telefon:</strong> {senderInfo.personSendingPhone || "N/A"}
              <br />
              <strong>Nume:</strong> {senderInfo.personSendingFirstName || ""}{" "}
              {senderInfo.personSendingSecondName || ""}
            </div>
          </div>
          <p style={{ color: "black" }}>Vă mulțumim pentru cumpărături!</p>
          <div
            style={{
              margin: "4rem 0",
              borderTop: "0.5px solid gray",
              paddingTop: "2rem",
            }}
          >
            Daca ai orice fel de nelamuriri, ne poti contacta prin raspuns la
            acest email sau la proparty@gmail.ro .
          </div>
        </div>
      </body>
    </html>
  );
}
