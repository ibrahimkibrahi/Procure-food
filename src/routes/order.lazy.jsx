import { useState, useEffect, useContext } from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import { CartContext } from '../contexts'
import Pizza from '../Pizza'
import Cart from '../Cart'

export const Route = createLazyFileRoute('/order')({
  component: Order,
});

const intl = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
})

function Order() {
  const [pizzaTypes, setPizzaTypes] = useState([])
  const [pizzaType, setPizzaType] = useState('pepperoni')
  const [pizzaSize, setPizzaSize] = useState('medium')
  const [cart, setcart] = useContext(CartContext)
  const [loading, setLoading] = useState(true)

  async function checkout() {
    setLoading(true)
    await fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart }),
    })

    setcart([])
    setLoading(false)
  }

  let price, selectedPizza

  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id)
    price = intl.format(selectedPizza.sizes[pizzaSize])
  }

  useEffect(() => {
    fetchPizzaTypes()
  }, [])

  async function fetchPizzaTypes() {
    // wait here for 10 seconds
    await new Promise((resolve) => setTimeout(resolve, 10000))
    const pizzaRes = await fetch('/api/pizzas')
    const pizzaJson = await pizzaRes.json()
    setPizzaTypes(pizzaJson)
    setLoading(false)
  }

  function addToCart() {
    setcart([...cart, { pizza: selectedPizza, size: pizzaSize, price }])
  }

  return (
    <div className="order-page">
      <div className="order">
        <h2>Create Order</h2>
        <form
          action={addToCart}
        >
          <div>
            <div>
              <label htmlFor="pizza-type">Pizza Type</label>
              <select
                name="pizza-type"
                value={pizzaType}
                onChange={(e) => {
                  setPizzaType(e.target.value)
                }}
              >
                {pizzaTypes.map((pizza) => (
                  <option key={pizza.id} value={pizza.id}>
                    {pizza.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="pizza-size">Pizza Size</label>
              <div>
                <span>
                  <input
                    checked={pizzaSize === 'S'}
                    type="radio"
                    name="pizza-size"
                    value="S"
                    id="pizza-s"
                    onChange={(e) => {
                      setPizzaSize(e.target.value)
                    }}
                  />
                  <label htmlFor="pizza-s">Small</label>
                </span>
                <span>
                  <input
                    checked={pizzaSize === 'M'}
                    type="radio"
                    name="pizza-size"
                    value="M"
                    id="pizza-m"
                    onChange={(e) => {
                      setPizzaSize(e.target.value)
                    }}
                  />
                  <label htmlFor="pizza-m">Medium</label>
                </span>
                <span>
                  <input
                    checked={pizzaSize === 'L'}
                    type="radio"
                    name="pizza-size"
                    value="L"
                    id="pizza-l"
                    onChange={(e) => {
                      setPizzaSize(e.target.value)
                    }}
                  />
                  <label htmlFor="pizza-l">Large</label>
                </span>
              </div>
            </div>
            <button type="submit">Add to Cart</button>
            <div className="order-pizza">
              <p>{price}</p>
            </div>
          </div>

          {loading ? (
            <h3>Loading...</h3>
          ) : (
            <Pizza
              name={selectedPizza.name}
              description={selectedPizza.description}
              image={selectedPizza.image}
            />
          )}
        </form>
      </div>
      {loading ? (
        <h2>LOADING ...</h2>
      ) : (
        <Cart checkout={checkout} cart={cart} />
      )}
    </div>
  )
}
