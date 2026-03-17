import { getAllStripeInvoices } from "Api/payments";
import Header from "components/Headers/Header";
import Loader from "Loader/Loader";
import { useEffect, useState } from "react";
import { Card, CardHeader, Table, Container, Row, Button } from "reactstrap";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [isloading, setisloading] = useState(true);
  const [isfetchingMore, setIsfetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [lastId, setLastId] = useState("none"); // "none" signals the initial load to backend

  // The core function to fetch and append data
  const handleGetInvoices = async (currentRefId, direction) => {
    if (direction === "next") {
      setIsfetchingMore(true);
    } else {
      setisloading(true);
    }

    try {
      // Call your API helper
      const response = await getAllStripeInvoices(currentRefId, direction);

      if (response && response.success) {
        // APPEND data if it's "next", otherwise set it (for initial load)
        if (direction === "next") {
          setInvoices((prev) => [...prev, ...response.invoices]);
        } else {
          setInvoices(response.invoices);
        }

        setHasMore(data.hasMore);
        setLastId(data.lastId);
      }
    } catch (error) {
      console.error("Error loading invoices:", error);
    } finally {
      setisloading(false);
      setIsfetchingMore(false);
    }
  };

  // Initial Load
  useEffect(() => {
    handleGetInvoices("none", "next");
  }, []);

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between">
                <h3 className="mb-0">Stripe Invoices</h3>
              </CardHeader>

              {isloading ? (
                <div className="text-center py-5">
                  <Loader />
                </div>
              ) : (
                <>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Invoice Number</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Status</th>
                        <th scope="col">Date</th>
                        <th scope="col">PDF</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((inv, index) => (
                        <tr key={inv.id || index}>
                          <td>{inv.invoiceNumber}</td>
                          <td>
                            <strong>{inv.userName}</strong>
                          </td>
                          <td>
                            {inv.amount} {inv.currency}
                          </td>
                          <td>{inv.status}</td>
                          <td>{inv.date}</td>
                          <td className="text-right">
                            {inv.pdf ? (
                              <a
                                href={inv.pdf}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <Button color="danger" size="sm" outline>
                                  <i className="fas fa-file-pdf mr-2" />
                                  View PDF
                                </Button>
                              </a>
                            ) : (
                              <Badge color="secondary">No PDF</Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  {/* Load More Button Section */}
                  {hasMore && (
                    <div className="text-center py-4">
                      <Button
                        color="info"
                        onClick={() => handleGetInvoices(lastId, "next")}
                        disabled={isfetchingMore}
                      >
                        {isfetchingMore ? "Loading..." : "Load More Invoices"}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Invoices;
