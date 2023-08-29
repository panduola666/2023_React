// import './App.css';
// import 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js';
// import 'bootstrap/scss/bootstrap.scss';
import { useMemo, useState, useRef } from 'react';
const data = [
  {
    id: 1,
    name: '珍珠奶茶',
    content: '香濃奶茶搭配QQ珍珠',
    price: 50,
  },
  {
    id: 2,
    name: '冬瓜檸檬',
    content: '清新冬瓜配上新鮮檸檬',
    price: 45,
  },
  {
    id: 3,
    name: '翡翠檸檬',
    content: '綠茶與檸檬的完美結合',
    price: 55,
  },
  {
    id: 4,
    name: '四季春茶',
    content: '香醇四季春茶，回甘無比',
    price: 45,
  },
  {
    id: 5,
    name: '阿薩姆奶茶',
    content: '阿薩姆紅茶搭配香醇鮮奶',
    price: 50,
  },
  {
    id: 6,
    name: '檸檬冰茶',
    content: '檸檬與冰茶的清新組合',
    price: 45,
  },
  {
    id: 7,
    name: '芒果綠茶',
    content: '芒果與綠茶的獨特風味',
    price: 55,
  },
  {
    id: 8,
    name: '抹茶拿鐵',
    content: '抹茶與鮮奶的絕配',
    price: 60,
  },
];

function Menu({ products, cart, setCart }) {
  const addCart = (product) => {
    if (cart.find((item) => item.id === product.id)) {
      setCart(
        cart.map((item) => ({
          ...item,
          num: item.id === product.id ? item.num + 1 : item.num,
        }))
      );
    } else {
      setCart([...cart, { ...product, num: 1 }]);
    }
  };
  return (
    <div className='list-group'>
      {products.map((product) => (
        <button
          key={product.id}
          type='button'
          className='list-group-item list-group-item-action'
          onClick={() => addCart(product)}
        >
          <h2 className='fs-4'>
            {product.name}{' '}
            <small className='fs-6 float-end'>${product.price}</small>
          </h2>
          <p className='text-black-50 mb-0'>{product.content}</p>
        </button>
      ))}
    </div>
  );
}

function ShoppingCart({ cart, setCart, orderList, setOrderList }) {
  const numOption = Array.from({ length: 20 }, (number, index) => {
    return index + 1;
  });
  const totalPrice = useMemo(() => {
    return cart.reduce(
      (total, product) => (total += product.price * product.num),
      0
    );
  }, [cart]);

  const commit = useRef(null);
  const changNum = (id, e) => {
    setCart(
      cart.map((item) => ({
        ...item,
        num: id === item.id ? +e.target.value : item.num,
      }))
    );
  };

  const deleteCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const createOrder = () => {
    setOrderList([
      ...orderList,
      {
        cart,
        commit: commit.current.value,
        total: totalPrice,
        created: new Date().valueOf(),
      },
    ]);
    commit.current.value = ''
    setCart([])
  };

  return (
    <>
      <table className='table table-sm table-hover text-center align-middle'>
        <thead>
          <tr>
            <th scope='col'>操作</th>
            <th scope='col'>品項</th>
            <th scope='col'>單價(元)</th>
            <th scope='col'>數量</th>
            <th scope='col'>小計(元)</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>
                <button
                  type='button'
                  className='btn btn-sm'
                  onClick={() => deleteCart(item.id)}
                >
                  x
                </button>
              </td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                <select
                  className='form-select form-select-sm'
                  aria-label='Default select example'
                  value={item.num}
                  onChange={(e) => changNum(item.id, e)}
                >
                  {numOption.map((number) => (
                    <option value={number} key={number}>
                      {number}
                    </option>
                  ))}
                </select>
              </td>
              <td>{item.price * item.num}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan='4' className='text-end'>
              總計
            </td>
            <td>$ {totalPrice}</td>
          </tr>
        </tfoot>
      </table>
      <textarea
        className='form-control mb-3 '
        rows='3'
        placeholder='備註'
        ref={commit}
      ></textarea>
      <button
        type='button'
        className='btn btn-primary float-end'
        onClick={createOrder}
      >
        送出
      </button>
    </>
  );
}

function History({ order, setCart }) {
  const addCart = () => {
    setCart(order.cart)
  }
  return (
    <div className='card h-100 border-primary border-2'>
      <div className='card-body'>
        <h5 className='card-title fs-6'>{new Date(order.created).toLocaleString()}
          <a href='#' className='btn btn-sm btn-primary float-end' onClick={addCart}>
            再點一次
          </a>
        </h5>
        <table className='table table-sm text-center align-middle card-text mt-3 mb-1'>
          <thead>
            <tr>
              <th scope='col'>品項</th>
              <th scope='col'>數量</th>
              <th scope='col'>小計</th>
            </tr>
          </thead>
          <tbody>
            {order.cart.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.num}</td>
              <td>{item.num * item.price}</td>
            </tr>))}
            </tbody>
          <tfoot>
            <tr>
              <td colSpan="2" className='text-end'>總計</td>
              <td>$ {order.total}</td>
            </tr>
          </tfoot>
        </table>
        {<small className=''>備註: {order.commit || '無'}</small>}
      </div>
    </div>
  );
}

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState([]);
  const [orderList, setOrderList] = useState([]);

  return (
    <>
      <div className='container'>
        <h1 className='text-center py-3'>飲料點餐系統</h1>
        <div className='row'>
          <div className='col-5'>
            <Menu
              products={products}
              cart={cart}
              setCart={setCart}
            />
          </div>
          <div className='col'>
            {cart.length ? (
              <ShoppingCart cart={cart} setCart={setCart} orderList={orderList}
              setOrderList={setOrderList} />
            ) : (
              <div className='alert alert-primary' role='alert'>
                請選擇商品
              </div>
            )}
          </div>
        </div>
        <hr />
        <div className='row gy-3'>
          {orderList.sort((pre,next) => next.created - pre.created).map(order => (
            <div className='col-4' key={order.created}>
              <History order={order} setCart={setCart} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
