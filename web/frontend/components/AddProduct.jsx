import { Form, FormLayout, TextField, Button } from '@shopify/polaris';
import { useState } from 'react';

const AddProductForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [vendor, setVendor] = useState('');

  const handleSubmit = async () => {
    const product = {
      product: {
        title,
        body_html: description,
        vendor,
        variants: [{ price }],
      },
    };

    await fetch('/admin/api/2023-01/products.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': 'a071ac5333cd2eaf316df80a26f27df8',
      },
      body: JSON.stringify(product),
    });

    alert('Product added successfully!');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <TextField label="Title" value={title} onChange={setTitle} />
        <TextField label="Description" value={description} onChange={setDescription} />
        <TextField label="Price" value={price} onChange={setPrice} type="number" />
        <TextField label="Vendor" value={vendor} onChange={setVendor} />
        <Button submit primary>
          Add Product
        </Button>
      </FormLayout>
    </Form>
  );
};

export default AddProductForm;
