import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import WishlistItem from './WishlistItem';

const ShareableLink = () => {
  const { listId } = useParams();
  const [wishlist, setWishlist] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      const docRef = doc(db, 'wishlists', listId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setWishlist({ id: docSnap.id, ...docSnap.data() });
      }
    };
    fetchWishlist();
  }, [listId]);

  const togglePurchased = async (itemIndex) => {
    const updatedItems = wishlist.items.map((item, index) =>
      index === itemIndex ? { ...item, purchased: !item.purchased } : item
    );
    const wishlistRef = doc(db, 'wishlists', wishlist.id);
    await updateDoc(wishlistRef, { items: updatedItems });
    setWishlist({ ...wishlist, items: updatedItems });
  };

  return wishlist ? (
    <div className="wishlist-container">
      <h1>{wishlist.title} by {wishlist.author}</h1>
      {wishlist.items.map((item, index) => (
        <div key={index} className={`wishlist-item ${item.purchased ? 'purchased' : ''}`}>
          <p>Title: {item.title}</p>
          <p>Link: <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a></p>
          <p>Size: {item.size}</p>
          <p>Color: {item.color}</p>
          <p>Price: ${item.price}</p>
          {item.imageUrl && (
            <img
              src={item.imageUrl}
              alt={item.title}
              style={{
                width: '100%', // Adjust the width to fit the container
                maxHeight: '300px', // Limit the height to keep the layout neat
                objectFit: 'contain', // Ensure the image maintains aspect ratio
                borderRadius: '5px',
                marginTop: '10px',
              }}
            />
          )}
          <button onClick={() => togglePurchased(index)}>{item.purchased ? 'Purchased' : 'Mark as Purchased'}</button>
        </div>
      ))}
    </div>
  ) : (
    <p>Loading wishlist...</p>
  );
};

export default ShareableLink;