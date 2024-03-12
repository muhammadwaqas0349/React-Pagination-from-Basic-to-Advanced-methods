import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([]); 
  const [page, setPage] = useState(1); 

  const fetchData = async() => {

    const result = await fetch('https://dummyjson.com/products?limit=100');
    const res = await result.json(); 

    if(res && res.products){
      setProducts(res.products); 
    }
    
  }

  useEffect( () => {
    fetchData(); 
  }, []); 

  const selectedPageHandler = (selectedpage) => {
    if(selectedpage > 1 && selectedpage <= products.length / 10 && 
    selectedpage !== page){
      setPage((selectedpage)); 
    }
    

  }; 

  return (
    <>
      <div className='App'>

        {products.length >0 && (
          <div className='products'>
              {products.slice(page*10 -10, page*10).map( (product) => {
            return <span key={product.id} className='product__single'>
              <img src={product.thumbnail} alt={product.title} />
              <span>{product.title}</span>
            </span>
          })}
          </div>
        )}

        {
          products.length>0 && (
            <div className="pagination">
              
              <span className={page > 1 ? "" : "pagination__disabled"} 
              onClick={() => selectedPageHandler(page - 1)}>⬅️</span>
              {
                [...Array(products.length/10)].map( (_, i) => {
                  return <span onClick={() => selectedPageHandler(i+1)}
                  className={page === i+1 ? "pagination__selected": ""} 
                  key={i}>{i+1}</span>
                })
              }
              <span className={page < products.length/10 ? "" : "pagination__disabled"}
              onClick={() => selectedPageHandler(page+1)}>➡️</span>
            </div>
          )
        }
        
        
      </div>
    </>
  )
}

export default App
