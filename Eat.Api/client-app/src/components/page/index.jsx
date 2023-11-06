/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sellerService from "../../services/seller-service";
import { Col, Row, Skeleton } from 'antd';
import SellerMenu from "../page/seller-menu";
import CartForm from "./cart-form";
import CartService from "../../services/cart-service";
import orderService from "../../services/order-service";

export default function SellerPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [seller, setSeller] = useState();
    const [trigger, setTrigger] = useState(false);
    const [cart, setCart] = useState();

    const loadItem = async () => {
        setLoading(true)
        const seller = await sellerService.get(id);
        const p = await orderService.get(3);
        console.log(p);
        setSeller(seller);
        setLoading(false);
    };

    const onUpdateCart = (v) => {
        setCart(v);
        setTrigger(!trigger);
    };

    const cartService = new CartService(id, onUpdateCart);

    useEffect(() => {
        loadItem(id);
        setCart(cartService.current);
    }, [id])

    return (
        <Col className="Page">
            <Skeleton loading={loading} active>
                <Row justify={'start'} align={"bottom"}
                    style={{ 
                        height:"20vh",
                        backgroundImage:`url(${seller?.image})`,
                        backgroundSize: '100%',
                        backgroundPosition: 'center',
                    }}>
                    <div className="header-image-gradient"/>
                    <h1 className="header-image-title ml-2">{seller?.title}</h1>
                </Row>
            </Skeleton>
            <Row justify={'center'} className="m-2">
                <SellerMenu item={seller} trigger={trigger} cart={cart} cartService={cartService}/>
            </Row>
            <Skeleton loading={loading} active>
                <CartForm seller={seller} trigger={trigger} cart={cart} cartService={cartService}/>
            </Skeleton>
        </Col>
    );
}