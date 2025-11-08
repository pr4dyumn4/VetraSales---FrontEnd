// ./search/SearchResultsList.jsx
function SearchResultsList({ results, pendingCart, cartItems, handleQuantityChange, handleConfirmCart, handleAddClick }) {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
        {results.map(p => (
          <tr key={p.id}>
            <td><img src={p.image} alt={p.name} width="80" /></td>
            <td>{p.name}</td>
            <td>{p.description}</td>
            <td>{p.price}</td>
            <td>
              {pendingCart[p.id] ? (
                <>
                  <input
                    type="number"
                    min="1"
                    value={cartItems[p.id]}
                    onChange={e => handleQuantityChange(p.id, e.target.value)}
                    style={{ width: '3em', marginRight: '0.5em' }}
                  />
                  <button onClick={() => handleConfirmCart(p)}>Confirm</button>
                </>
              ) : (
                <button onClick={() => handleAddClick(p.id)}>Add to Cart</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SearchResultsList;
