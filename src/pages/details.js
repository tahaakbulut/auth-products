import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { Rate } from '../components/rate';
import { AiFillStar } from 'react-icons/ai';
import { useProducts } from '../contexts/products-context';
import { useAuth } from '../contexts/auth-context';

const Details = () => {
  const params = useParams();
  const { product, getProduct, setComment } = useProducts();
  const { userId } = useAuth();
  const [commentShow, setCommentShow] = useState(false);
  const [formError, setFormError] = useState(false);

  useEffect(() => {
    getProduct(params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!e.target.rate.value || !e.target.comment.value) {
      setFormError(true);
      return;
    }
    setComment(params.id, {
      userId: userId,
      comment: e.target.comment.value,
      star: e.target.rate.value,
    });
    getProduct(params.id);
    setCommentShow(false);
  };

  const calcAvvarageRaiting = () => {
    if (!product?.comments) return;
    const stars = product.comments.map((e) => Number(e.star));
    return parseFloat((stars.reduce((a, b) => a + b, 0) / stars.length).toFixed(1));
  };

  const getUserComments = () => {
    return product?.comments?.find((comment) => comment.userId === userId);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 space-y-4">
      <div className="max-w-xl bg-white shadow-lg rounded-lg overflow-hidden min-h-[625px]">
        <div className="p-4">
          <img src={product.image} alt="" width={576} height={324} />
          <h1 className="text-gray-900 font-bold text-2xl my-2">{product.name}</h1>
        </div>
        <nav className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <button
            onClick={() => setCommentShow(false)}
            className={`inline-flex p-4 rounded-t-lg border-b-2 hover:text-gray-600 ${
              !commentShow ? 'text-gray-600 border-gray-300' : 'border-transparent'
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setCommentShow(true)}
            className={`inline-flex p-4 rounded-t-lg border-b-2 hover:text-gray-600 ${
              commentShow ? 'text-gray-600 border-gray-300' : 'border-transparent'
            }`}
          >
            Comments
          </button>
        </nav>

        <div className="p-4">
          {!commentShow ? (
            <div className="text-left">
              <p className="mt-2 text-gray-600 text-sm">Description: {product.desc}</p>
              <p className="mt-2 text-gray-600 text-sm">
                Price: {product.currency}
                {product.price}
              </p>
              <p className="mt-2 text-gray-600 text-sm">Arrival: {product.arrival}</p>
              <p className="mt-2 text-gray-600 text-sm">Total Comments: {product.comments?.length} </p>
              <p className="mt-2 text-gray-600 text-sm">Score: {calcAvvarageRaiting()}</p>
            </div>
          ) : (
            <>
              {[...product.comments].reverse().map((e, i) => (
                <article key={i} className="border-b-2 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <AiFillStar className="text-orange-400" />
                    <p>{e.star}</p>
                  </div>
                  <p className="mb-2 font-light text-gray-500 dark:text-gray-400">{e.comment}</p>
                </article>
              ))}
              <form onSubmit={handleCommentSubmit}>
                <div className="text-4xl my-4 text-center">
                  <Rate defaultValue={getUserComments()?.star} />
                </div>
                <div className="P-4">
                  <textarea
                    name="comment"
                    rows="6"
                    className="border w-full p-4"
                    defaultValue={getUserComments()?.comment}
                  ></textarea>
                </div>
                {formError && <div className="text-red-800 pb-2">Please enter comment and rate</div>}
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <Link to="/" className="inline-flex items-center">
        <BiArrowBack className="mr-2" />
        Home
      </Link>
    </div>
  );
};
export default Details;
