import { useEffect, useState } from 'react';
import { Navbar, Products } from './components';
import useFetch from './hooks/useFetch';
import Sort from './components/sort';

const App = () => {
  const [user, setUser] = useState(null);
   const [sortedProduct, setSortedProduct] = useState(null)

  useEffect(() => {
    const ls = localStorage.getItem('user');
    if (ls) {
      setUser(ls);
    }
  }, []);


  const { data, error, loading } = useFetch('https://fakestoreapi.com/products');

  return (
    <div>
      <Navbar user={user} />
      <Sort products={data} setSortedProduct={setSortedProduct}/>
      {loading ? (
        <div className="text-center text-5xl text-gray-400 py-20">
          <i className="fa fa-circle-notch fa-spin"></i>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-20">
          <p>Error: {error}</p>
        </div>
      ) : (
        <Products products={sortedProduct || data} />
      )}
    </div>
  );
};

export default App;
