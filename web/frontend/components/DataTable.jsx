import { Card, DataTable } from '@shopify/polaris';

const ProductTable = ({ products }) => {
  const rows = products.map((product) => [
    <img
      src={product.image.src}
      alt={product.image.alt}
      style={{ width: '50px', height: '50px' }}
    />,
    product.title,
    product.description,
    `$${product.price}`,
    product.vendor,
  ]);

  return (
    <Card>
      <DataTable
        columnContentTypes={['text', 'text', 'text', 'text', 'text']}
        headings={['Image', 'Title', 'Description', 'Price', 'Vendor']}
        rows={rows}
      />
    </Card>
  );
};

export default ProductTable;
