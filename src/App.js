import React, { useState, useRef, useEffect } from "react";
import { Alert } from "./Alert";
import { List } from "./List";
import './App.css';

// Get list from localstarage 
const getListFromLocalStorage = () => {
  const list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
}

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getListFromLocalStorage());
  const [editable, setEditable] = useState(false);
  const [editId, setEditId] = useState("");
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });

  // Set the change of list every time component updated to local storage
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);


  // Reference to the focus input
  const inputRef = useRef();

  // handleSubmit function handle very change in the app
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name) {
      showAlert(true, "Input Mustn't Be Empty", "danger");
    } else if (name && editable) {
      setList(list.map((item) => {
        if (item.id === editId) {
          return {...item, title: name};
        } else {
          return item;
        }
      }));
      showAlert(true, "You edited item", "success");
      setName("");
      setEditId("");
      setEditable(false);
    } else {
      showAlert(true, "You added item", "success");
      const newItem = {
        id: new Date().getTime().toString(),
        title: name
      };
      setList([...list, newItem]);
      setName("");
    }
  }
  const showAlert = (show = false, message = "", type = "") => {
    setAlert({show, message, type});
  }
  const handleChange = (event) => {
    const value = event.target.value;
    setName(value);
  }
  const removeItem = (itemId) => {
    const newList = list.filter((item) => item.id !== itemId);
    setList(newList);
    showAlert(true, `You removed item`, "danger");
  }
  const clearList = () => {
    if (list.length === 0) {
      showAlert(true, "No item to clear it", "danger");
    } else {
      setList([]);
      showAlert(true, "All item is removed", "danger");
    }
  }
  const editItem = (id) => {
    let specificItem = list.find((item) => item.id === id);
    setEditable(true);
    setEditId(id);
    setName(specificItem.title);
    inputRef.current.focus();
  }
  return (
    <section className="grocery">
      <article className="container">
        <Alert 
          {...alert}
          showAlert={showAlert}
          list={list}
        />
        <h2 className="title">Grocery Bud</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="e.g Eggs"
            value={name}
            onChange={handleChange}
            ref={inputRef}
          />
          <button type="submit">Submit</button>
        </form>
        <List
          list={list}
          removeItem={removeItem}
          editItem={editItem}
        />
        <button type="button" className="clear-btn" onClick={clearList}>Clear List</button>
      </article>
    </section>
  );
}

export default App;
