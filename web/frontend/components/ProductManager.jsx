import React, { useState, useEffect } from 'react';
import { Card, DataTable, Button, Modal, Form, FormLayout, TextField, Toast } from '@shopify/polaris';

const ACCESS_TOKEN = 'a071ac5333cd2eaf316df80a26f27df8';
const API_URL = '/admin/api/2023-01/products.json';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [toast, setToast] = useState({ show: false, content: '' });

  // Fetch Products
  const fetchProducts = async () => {
    const response = await fetch(API_URL, {
      headers: { 'X-Shopify-Access-Token': ACCESS_TOKEN },
    });
    const data = await response.json();
    setProducts(
      data.products.map((product) => ({
        id: product.id,
        image: { src: product.image?.src, alt: product.title },
        title: product.title,
        description: product.body_html,
        price: product.variants[0]?.price,
        vendor: product.vendor,
      }))
    );
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Delete
  const deleteProduct = async (id) => {
    await fetch(`/admin/api/2023-01/products/${id}.json`, {
      method: 'DELETE',
      headers: { 'X-Shopify-Access-Token': ACCESS_TOKEN },
    });
    setToast({ show: true, content: 'Product deleted successfully!' });
    fetchProducts();
  };

  // Handle Save (Update Product)
  const saveProduct = async () => {
    const productData = {
      product: {
        title: editingProduct.title,
        body_html: editingProduct.description,
        vendor: editingProduct.vendor,
        variants: [{ price: editingProduct.price }],
      },
    };

    await fetch(`/admin/api/2023-01/products/${editingProduct.id}.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': ACCESS_TOKEN,
      },
      body: JSON.stringify(productData),
    });

    setToast({ show: true, content: 'Product updated successfully!' });
    setShowModal(false);
    fetchProducts();
  };

  // Open Edit Modal
  const openEditModal = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  // Render Rows
  const rows = products.map((product) => [
    <img src={product.image.src} alt={product.image.alt} style={{ width: '50px', height: '50px' }} />,
    product.title,
    product.description,
    `$${product.price}`,
    product.vendor,
    <Button plain onClick={() => openEditModal(product)}>
      Edit
    </Button>,
    <Button destructive plain onClick={() => deleteProduct(product.id)}>
      Delete
    </Button>,
  ]);

  return (
    <>
      <Card>
        <DataTable
          columnContentTypes={['text', 'text', 'text', 'text', 'text', 'text', 'text']}
          headings={['Image', 'Title', 'Description', 'Price', 'Vendor', 'Edit', 'Delete']}
          rows={rows}
        />
      </Card>

      {showModal && (
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          title="Edit Product"
          primaryAction={{ content: 'Save', onAction: saveProduct }}
          secondaryActions={[{ content: 'Cancel', onAction: () => setShowModal(false) }]}
        >
          <Modal.Section>
            <Form>
              <FormLayout>
                <TextField
                  label="Title"
                  value={editingProduct.title}
                  onChange={(value) => setEditingProduct({ ...editingProduct, title: value })}
                />
                <TextField
                  label="Description"
                  value={editingProduct.description}
                  onChange={(value) => setEditingProduct({ ...editingProduct, description: value })}
                />
                <TextField
                  label="Price"
                  type="number"
                  value={editingProduct.price}
                  onChange={(value) => setEditingProduct({ ...editingProduct, price: value })}
                />
                <TextField
                  label="Vendor"
                  value={editingProduct.vendor}
                  onChange={(value) => setEditingProduct({ ...editingProduct, vendor: value })}
                />
              </FormLayout>
            </Form>
          </Modal.Section>
        </Modal>
      )}

      {toast.show && <Toast content={toast.content} onDismiss={() => setToast({ show: false })} />}
    </>
  );
};

export default ProductManager;
