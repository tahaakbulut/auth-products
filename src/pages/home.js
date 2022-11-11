import { useEffect } from 'react';
import { Table } from '../components/table';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';
import { useProducts } from '../contexts/products-context';

const Home = () => {
  const { products, getProducts } = useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTableAction = (e) => {
    navigate(`/details/${e}`);
  };

  return (
    <Table
      tableData={products}
      handleAction={handleTableAction}
      actionTag={<AiOutlineEye size="1.2rem" className="inline-block" />}
    />
  );
};

export default Home;
