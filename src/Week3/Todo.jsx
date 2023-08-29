import axios from 'axios';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
const { VITE_BASEURL } = import.meta.env;

function TodoList({ tag, changeTag, todos, getTodo }) {
  const filterTodo = useMemo(() => {
    return todos.filter((item) => {
      switch (tag) {
        case '全部':
          return item;
        case '待完成':
          return !item.status;
        case '已完成':
          return item.status;
      }
    });
  }, [todos]);
  const toggleTodo = async (e, id) => {
    try {
      await axios.patch(`${VITE_BASEURL}/todos/${id}/toggle`);
      getTodo();
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  const delTodo = async (e, id) => {
    e.preventDefault();
    try {
      await axios.delete(`${VITE_BASEURL}/todos/${id}`);
      getTodo();
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  const clearTodo = async (e) => {
    e.preventDefault();
    try {
      const finishTodos = todos.filter(
        (todo) =>
          todo.status && axios.delete(`${VITE_BASEURL}/todos/${todo.id}`)
      );

      if (!finishTodos.length) {
        alert('當前沒有已完成項目');
        return;
      }
      await Promise.all(finishTodos);
      getTodo();
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  return (
    <div className='todoList_list'>
      <ul className='todoList_tab'>
        <li>
          <a
            href='#'
            className={tag === '全部' ? 'active' : ''}
            onClick={changeTag}
          >
            全部
          </a>
        </li>
        <li>
          <a
            href='#'
            className={tag === '待完成' ? 'active' : ''}
            onClick={changeTag}
          >
            待完成
          </a>
        </li>
        <li>
          <a
            href='#'
            className={tag === '已完成' ? 'active' : ''}
            onClick={changeTag}
          >
            已完成
          </a>
        </li>
      </ul>
      <div className='todoList_items'>
        <ul className='todoList_item'>
          {filterTodo.map((todo) => {
            return (
              <li key={todo.id}>
                <label className='todoList_label'>
                  <input
                    className='todoList_input'
                    type='checkbox'
                    value={todo.status}
                    checked={todo.status}
                    onChange={(e) => toggleTodo(e, todo.id)}
                  />
                  <span>{todo.content}</span>
                </label>
                <a href='#' onClick={(e) => delTodo(e, todo.id)}>
                  <i className='fa fa-times'></i>
                </a>
              </li>
            );
          })}
          {!filterTodo.length && <li className='todoList_label' style={{justifyContent: 'center'}}>請查看其他列表</li>}
        </ul>
        <div className='todoList_statistics'>
          <p> {todos.filter((todo) => !todo.status).length} 個待完成項目</p>
          <a href='#' onClick={clearTodo}>
            清除已完成項目
          </a>
        </div>
      </div>
    </div>
  );
}

TodoList.propTypes = {
    tag: PropTypes.string,
    changeTag: PropTypes.func,
    todos: PropTypes.array,
    getTodo: PropTypes.func,
}

function Todo() {
  const nickname = useRef(false);
  const [todos, setTodos] = useState([]);
  const [tag, setTag] = useState('全部');
  const newTodo = useRef();
  const navigate = useNavigate();

  const getTodo = async () => {
    try {
      const res = await axios.get(`${VITE_BASEURL}/todos`);
      const { data } = res.data;
      setTodos(data);
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  const checkOut = async () => {
    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];
      axios.defaults.headers.common['Authorization'] = token;
      const res = await axios.get(`${VITE_BASEURL}/users/checkout`);
      nickname.current = res.data.nickname;
    } catch (err) {
      alert(err.response.data.message);
      navigate('/');
    }
  };

  useEffect(() => {
    checkOut();
    getTodo();
  }, [tag]);

  // 登出
  const signOut = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${VITE_BASEURL}/users/sign_out`);
      document.cookie = `token=';expires=${new Date()}`;
      alert(res.data.message);
    } catch (err) {
      alert(err.response.data.message);
    }
    navigate('/');
  };

  const changeTag = (e) => {
    e.preventDefault();
    setTag(e.target.textContent);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${VITE_BASEURL}/todos`, {
        content: newTodo.current.value,
      });
      newTodo.current.value = '';
      getTodo();
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div id='todoListPage' className='bg-half'>
      <nav>
        <h1>
          <a href='#'>ONLINE TODO LIST</a>
        </h1>
        <ul>
          <li className='todo_sm'>
            <a href='#'>
              <span>{nickname.current}的代辦</span>
            </a>
          </li>
          <li>
            <a href='#' onClick={signOut}>
              登出
            </a>
          </li>
        </ul>
      </nav>
      <div className='conatiner todoListPage vhContainer'>
        <div className='todoList_Content'>
          <div className='inputBox'>
            <input type='text' placeholder='請輸入待辦事項' ref={newTodo} />
            <a href='#' onClick={addTodo}>
              <i className='fa fa-plus'></i>
            </a>
          </div>
          {todos.length ? (
            <TodoList
              tag={tag}
              changeTag={changeTag}
              todos={todos}
              getTodo={getTodo}
            ></TodoList>
          ) : (
            <div className='empty'>
              <p>目前尚無待辦事項</p>
              <img
                src='https://github.com/panduola666/2023_React/blob/master/src/assets/img/empty.png?raw=true'
                alt='目前尚無待辦事項'
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Todo;
