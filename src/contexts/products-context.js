import React, { useContext } from 'react';
import useLocalStorage from '../hooks/use-local-storage';
import { useAuth } from './auth-context';
const ProductContext = React.createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const { token, logout } = useAuth();
  const [products, setProducts] = useLocalStorage('products', []);
  const [product, setProduct] = useLocalStorage('product', {});

  const getProducts = () => {
    fetch('http://localhost:8000/products', {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status === 401) return logout();
        setProducts(json);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const getProduct = (id) => {
    fetch(`http://localhost:8000/details/${id}`, {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status === 401) return logout();
        setProduct(json);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const setComment = (id, data) => {
    const isNewComments = !product.comments.find((comment) => comment.userId === data.userId);
    const updatedComments = product.comments.map((comment) => {
      return comment.userId === data.userId ? data : comment;
    });

    fetch(`http://localhost:8000/details/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify({ comments: isNewComments ? [...product.comments, data] : updatedComments }),
      headers: {
        Authorization: token,
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status === 401) return logout();
        console.log('success:', json);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <ProductContext.Provider value={{ product, products, getProduct, getProducts, setComment }}>
      {children}
    </ProductContext.Provider>
  );
};
