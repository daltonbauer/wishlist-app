import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const Wishlist = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [items, setItems] = useState([]);
  const [link, setLink] = useState(null);

  const addItem = () => {
    setItems([...items, { title: '', link: '', size: '', color: '', price: '', imageUrl: '', purchased: false }]);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const createList = async () => {
    if (!title || !author) {
      alert("Please provide a title and an author for the wishlist.");
      return;
    }

    try {
      const wishlistRef = await addDoc(collection(db, 'wishlists'), { title, author, items });
      setLink(`${window.location.origin}/share/${wishlistRef.id}`);
    } catch (error) {
      console.error("Error creating wishlist:", error);
      alert("There was an error creating the wishlist. Please try again.");
    }
  };

  return (
    <div className="wishlist-container">
      <h1>Create Your Wishlist</h1>
      <input placeholder="Wishlist Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
      {items.map((item, index) => (
        <div key={index} className="wishlist-item">
          <input placeholder="Item Title" onChange={(e) => updateItem(index, 'title', e.target.value)} />
          <input placeholder="Link" onChange={(e) => updateItem(index, 'link', e.target.value)} />
          <input placeholder="Size" onChange={(e) => updateItem(index, 'size', e.target.value)} />
          <input placeholder="Color" onChange={(e) => updateItem(index, 'color', e.target.value)} />
          <input placeholder="Price" onChange={(e) => updateItem(index, 'price', e.target.value)} />
          <input placeholder="Image URL" onChange={(e) => updateItem(index, 'imageUrl', e.target.value)} />
          {item.imageUrl && <img src={item.imageUrl} alt={item.title} style={{ width: '100%', borderRadius: '5px', marginTop: '10px' }} />}
        </div>
      ))}
      <button onClick={addItem}>Add Item</button>
      <button onClick={createList}>Create List</button>
      {link && <p>Shareable Link: <a href={link} target="_blank" rel="noopener noreferrer">{link}</a></p>}
    </div>
  );
};

export default Wishlist;