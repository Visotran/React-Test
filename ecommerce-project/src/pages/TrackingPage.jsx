import './TrackingPage.css';
import {Header} from '../components/Header';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

export function TrackingPage({cart}) {

  const {orderId, productId} = useParams();

  const [trackingData, setTrackingData] = useState(null);
  
  useEffect(() => {

    const fetchTrackingData = async () => {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setTrackingData(response.data);
      console.log("RRR")
    }

    fetchTrackingData();

  }, [orderId])

  if (!trackingData) return null;

  const product = trackingData.products.find((product) => product.productId === productId)
  const totalDeliveryTimeMs = product.estimatedDeliveryTimeMs - trackingData.orderTimeMs;
  const timePassedMs = (dayjs().valueOf() - trackingData.orderTimeMs);
  let deliveryProgress = (timePassedMs / totalDeliveryTimeMs) * 100
  
  let isDelivered = false;
  if (deliveryProgress > 100) {
    deliveryProgress = 100;
    isDelivered = true;
  }

  let isPreparing = false;
  let isShipped = false;

  if (deliveryProgress < 33) {
    isPreparing = true;
  } else if (deliveryProgress >= 33 && deliveryProgress < 100) {
    isShipped = true;
  }

  return (
    <>
      <title>Tracking</title>

      <Header cart={cart}></Header>

      <div className="tracking-page">
        <div className="order-tracking">
          <a className="back-to-orders-link link-primary" href="/orders">
            View all orders
          </a>

          <div className="delivery-date">
            {deliveryProgress >= 100 ? "Delivered on " : "Arriwing on "} {dayjs(product.estimatedDeliveryTimeMs).format("MMMM D")}
          </div>

          <div className="product-info">
            {product.product.name}
          </div>

          <div className="product-info">
            Quantity: {product.quantity}
          </div>

          <img className="product-image" src={product.product.image} />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing && 'current-status'}`}>
              Preparing
            </div>
            <div className={`progress-label ${isShipped && 'current-status'}`}>
              Shipped
            </div>
            <div className={`progress-label ${isDelivered && 'current-status'}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{width: `${deliveryProgress}%`}}></div>
          </div>
        </div>
      </div>
    </>
  );
}