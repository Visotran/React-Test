import axios from 'axios';
import { useEffect, useState } from 'react';
import {Header} from '../../components/Header';
import './HomePage.css';
import { ProductsGrid } from './ProductsGrid';
import { useSearchParams } from 'react-router';

export function HomePage({cart, loadCart}) {
  const [products, setProducts] = useState([]);

  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    const getHomeData = async () => {
      const response = (search ? await axios.get(`/api/products?search=${search}`) : await axios.get('/api/products'));
      setProducts(response.data);
    }
    
    getHomeData();
  }, [search])
  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
      <Header cart={cart}></Header>
      <div className="home-page">
      <ProductsGrid products={products} loadCart={loadCart}  />
      </div>
    </>
  );
}