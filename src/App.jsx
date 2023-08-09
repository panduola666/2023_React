import { useState } from 'react';
import './App.css';

const data = [
  {
    id: 1,
    name: '珍珠奶茶',
    content: '香濃奶茶搭配QQ珍珠',
    price: 50,
    num: 20,
  },
  {
    id: 2,
    name: '冬瓜檸檬',
    content: '清新冬瓜配上新鮮檸檬',
    price: 45,
    num: 18,
  },
  {
    id: 3,
    name: '翡翠檸檬',
    content: '綠茶與檸檬的完美結合',
    price: 55,
    num: 34,
  },
  {
    id: 4,
    name: '四季春茶',
    content: '香醇四季春茶，回甘無比',
    price: 45,
    num: 10,
  },
  {
    id: 5,
    name: '阿薩姆奶茶',
    content: '阿薩姆紅茶搭配香醇鮮奶',
    price: 50,
    num: 25,
  },
  {
    id: 6,
    name: '檸檬冰茶',
    content: '檸檬與冰茶的清新組合',
    price: 45,
    num: 20,
  },
  {
    id: 7,
    name: '芒果綠茶',
    content: '芒果與綠茶的獨特風味',
    price: 55,
    num: 18,
  },
  {
    id: 8,
    name: '抹茶拿鐵',
    content: '抹茶與鮮奶的絕配',
    price: 60,
    num: 20,
  },
];
function App() {
  const [products, setProducts] = useState(data);
  const [newProduct, setNewProduct] = useState('');
  const [changName, setChangeName] = useState(false)

  function patchProducts(product, config) {
    const arr = products.map(item => item.id === product.id ? {
      ...item,
      num: config === 'add' ? product.num + 1: product.num - 1,
    }: item)
    setProducts(arr)
  }

  function setNewName(e) {
    setNewProduct({
      ...newProduct,
      name: e.target.value
    })
  }

  function reName(product, e) {
    if(changName && product.id !== newProduct.id) {
      alert('請先保存品項')
      return
    }
    if(e.target.textContent === '保存') {
      const newArr = products.map(item => item.id === newProduct.id ? newProduct: item)
      setProducts(newArr)
    }else{
      setNewProduct(product)
    }
    setChangeName(!changName)
  }

  return (
    <div className='container'>
    <table>
      <thead>
        <tr>
          <th scope='col'>品項</th>
          <th scope='col'>描述</th>
          <th scope='col'>價格</th>
          <th scope='col'>庫存</th>
          <th scope='col'>庫存</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product => (
          <tr key={product.id} className={changName && product.id === newProduct.id? 'active' : ''}>
          <td>
            { product.name }</td>
          <td>
            <small>{ product.content }</small>
          </td>
          <td>{ product.price }</td>
          <td>
            <button type="button" onClick={() => patchProducts(product, 'remove')}>-</button>{ product.num }<button type="button" onClick={() => patchProducts(product, 'add')}>+</button>
          </td>
          <td>
            <button type="button" onClick={(e) => reName(product, e)}>{changName && product.id === newProduct.id ? '保存' : '修改品項'}</button>
          </td>
        </tr>
        )))}
      </tbody>
    </table>
    {
      changName ? (<div className="box">
      <label htmlFor="newName">欲修改的品項名</label>
      <input type="text" name="newName" id="newName" value={newProduct.name} onChange={setNewName} />
    </div>) : ""
    }
    
    </div>
  );
}

export default App;
