import React, { useState } from 'react'

const useLocalStorage = (key) => {
  const [storedValue, setStoredValue] = useState(() => {
    // Try to load data from localStorage initially
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  });

  const loadData = async () => {
    try {
      let temp = localStorage.getItem(key);
      let res = JSON.parse(temp)
      setStoredValue(res)
      return res
    } catch (error) {
      console.log(error)
      return undefined;
    }
  }
  const saveData = (data) => {
    localStorage.setItem(key, JSON.stringify(data));
    setStoredValue(data)
  }


  return { loadData, saveData, storedValue }
}

export default useLocalStorage