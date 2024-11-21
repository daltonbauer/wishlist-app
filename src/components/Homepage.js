import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const [wishlists, setWishlists] = useState([]);
  const { currentUser } = useAuth(); // Assume this gets the logged-in user’s data

  useEffect(() => {
    const fetchWishlists = async () => {
      const q = query(collection(db, 'wishlists'), where('authorID', '==', currentUser.uid));
      const querySnapshot = await getDocs(q);
      setWishlists(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchWishlists();
  }, [currentUser]);

  const createNewWishlist = async () => {
    const newWishlist = { title: "New Wishlist", authorID: currentUser.uid, items: [] };
    await addDoc(collection(db, 'wishlists'), newWishlist);
    fetchWishlists();
  };

  return (
    <div>
      <h1>Your Wishlists</h1>
      <button onClick={createNewWishlist}>Create New Wishlist</button>
      <ul>
        {wishlists.map(wishlist => (
          <li key={wishlist.id}>
            <h2>{wishlist.title}</h2>
            <button>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;