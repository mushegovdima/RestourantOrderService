/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sellerService from "../../services/seller-service";
import { Button, Col, Row, Skeleton, Tabs } from 'antd';
import SellerInfo from "../admin/info";
import type { TabsProps } from 'antd';
import Positions from "./positions";
import OrderHandlerSettingsEditor from "./order-handler-settings";

export default function Seller() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [seller, setSeller] = useState();

    const loadItem = async () => {
        setLoading(true)
        const seller = await sellerService.get(id);
        setSeller(seller);
        setLoading(false);
    };

    const items: TabsProps['items'] = [
        {
        key: '1',
        label: 'Общее',
        children: <SellerInfo item={seller} onCreated={loadItem}/>,
        },
        {
        key: '2',
        label: 'Позиции ресторана',
        children: <Positions item={seller} onUpdated={loadItem}/>,
        },
        {
        key: '3',
        label: `Отправка заказа`,
        children: <OrderHandlerSettingsEditor item={seller} />
        },
    ];

    useEffect(() => {
        loadItem(id);
    }, [id]);

    return (
        <Col>
            <Skeleton loading={loading} active>
                <Row className="mt-2" justify={'center'} align={'middle'}>
                    <div>
                        <h2>Ресторан: {seller?.title}</h2>
                    </div>
                    <div className="ml-2">
                        <Button href={`/${seller?.login}`}>Page</Button>
                    </div>
                </Row>
                <Tabs
                    defaultActiveKey="1"
                    className="m-4 mt-1"
                    items={items}
                    >
                </Tabs>
            </Skeleton>
        </Col>
    );
}