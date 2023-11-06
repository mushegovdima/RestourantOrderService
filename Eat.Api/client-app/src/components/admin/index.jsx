import React, { useEffect, useState } from "react";
import sellerService from "../../services/seller-service";
import { Button, Col, Divider, Row, List, Spin, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import SellerInfo from "./info";

export default function Sellers() {
    const [sellers, setSellers] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [selectedItemId, setSelectedItemId] = useState();

    const appendData = async () => {
      setLoading(true);
      const sellers = await sellerService.getAll();
      const total = sellers?.length || 0;
      setSellers(sellers);
      setTotal(total);
      setLoading(false);
    };

    useEffect(() => {
      appendData();
    }, []);

    return (
      <Row justify={"space-around"}>
          <Row>
            <Col>
              <Row className="m-4" align={"middle"}>
                <Col> Точек подключено: {total}</Col>
                <Col>
                  <Spin spinning={loading} />
                </Col>
                <Col className="ml-2">
                  <Button onClick={() => setSelectedItemId(null)}>Добавить</Button>
                </Col>
              </Row>
              <Row>
                <Col style={{ width: "100%" }}>
                  <div
                      id="scrollableDiv"
                      style={{
                        height: "100%",
                        overflow: 'auto',
                      }}
                    >
                      <InfiniteScroll
                        dataLength={total}
                        next={appendData}
                        hasMore={false}
                        loader={<Skeleton paragraph={{ rows: 1 }} active />}
                        endMessage={<Divider></Divider>}
                        scrollableTarget="scrollableDiv"
                      >
                        <List
                          dataSource={sellers}
                          renderItem={(item) => (
                            <List.Item key={item.id}>
                              <List.Item.Meta
                                title={<span>{item.title}</span>}
                                description={item.name}
                              />
                              <Button href={`/admin/seller/${item.id}`}>Edit</Button>
                              <Button href={`/${item.login}`}>Page</Button>
                            </List.Item>
                          )}
                        />
                      </InfiniteScroll>
                    </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
              <SellerInfo itemId={selectedItemId} onCreated={appendData}/>
          </Row>
      </Row>
    );
}