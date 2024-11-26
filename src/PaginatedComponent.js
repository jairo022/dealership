// PaginatedComponent.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, limit, startAfter } from 'firebase/firestore';
import { db } from '../fireBaseConfig'; // Adjust path as needed

const PaginatedComponent = () => {
  const [data, setData] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMoreData = async () => {
    const collectionRef = collection(db, 'yourCollection'); // Replace with your actual collection name
    let q;

    if (lastVisible) {
      q = query(collectionRef, limit(10), startAfter(lastVisible));
    } else {
      q = query(collectionRef, limit(10));
    }

    const snapshot = await getDocs(q);
    const fetchedData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setData(prev => [...prev, ...fetchedData]);
    setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    setLoading(false);
  };

  useEffect(() => {
    fetchMoreData();
  }, []);

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div> // Adjust based on your data structure
      ))}
      <button onClick={fetchMoreData} disabled={loading}>
        Load More
      </button>
    </div>
  );
};

export default PaginatedComponent;
