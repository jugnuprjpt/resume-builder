import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";
const useGetUserInfo = () => {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    const testRef = await collection(db, "resume");
    const queryString = query(testRef);
    const querySnapshot = await getDocs(queryString);
    querySnapshot.forEach((doc) => {
      const details = doc.data()?.data;

      setUserDetails({ id: doc.id, details });
    });
    setLoading(false);
  };

  return {
    userDetails,
    loading,
  };
};
export default useGetUserInfo;
