import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../firebase';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const SharedWishlist = () => {
  const user = useAuth();
  const [wishlists, setWishlists] = useState([]);

  useEffect(() => {
    const fetchWishlists = async () => {
      const querySnapshot = await getDocs(collection(db, 'wishlists'));
      const wishlistData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWishlists(wishlistData);
    };

    if (user) {
      fetchWishlists();
    }
  }, [user]);

  if (!user) {
    // Redirect to the sign-in page if the user is not authenticated
    return <Navigate to="/signin" replace />;
  }

  return (
    <div>
      <h1>Your Wishlists</h1>
      <ul>
        {wishlists.map((wishlist) => (
          <li key={wishlist.id}>
            <Link to={`/wishlist/${wishlist.id}`}>
              {wishlist.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SharedWishlist;