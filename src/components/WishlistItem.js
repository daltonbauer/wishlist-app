// src/components/WishlistItem.js
import React from 'react';

const WishlistItem = ({ item, togglePurchased }) => (
  <div className={`wishlist-item ${item.purchased ? 'purchased' : ''}`}>
    <p>Title: {item.title}</p>
    <p>Link: <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a></p>
    <p>Size: {item.size}</p>
    <p>Color: {item.color}</p>
    <p>Price: ${item.price}</p>
    <button onClick={togglePurchased}>{item.purchased ? 'Purchased' : 'Mark as Purchased'}</button>
  </div>
);

export default WishlistItem;