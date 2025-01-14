import { useEffect, useState } from 'react';

const fetchProducts = async () => {
  const response = await fetch('/admin/api/2023-01/products.json', {
    headers: {
      'X-Shopify-Access-Token': 'a071ac5333cd2eaf316df80a26f27df8',
    },
  });
  const data = await response.json();
  return data.products.map((product) => ({
    image: { src: product.image?.src, alt: product.title },
    title: product.title,
    description: product.body_html,
    price: product.variants[0]?.price,
    vendor: product.vendor,
  }));
};

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return <ProductTable products={products} />;
};

export default ProductList;
