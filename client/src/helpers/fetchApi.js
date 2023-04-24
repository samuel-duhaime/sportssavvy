// Fetch data with API
export const fetchApi = async ({ apiUrl, setData, setTotalNumberItems }) => {
  try {
    const result = await fetch(apiUrl);
    const { data, totalNumberItems, status, message } = await result.json();

    // For status error
    if (status !== 200) {
      throw new Error(message); // For error status
    }

    // If everything is good
    if (data) {
      setData(data);
    }

    // If totalNumberItems for Search page
    if (totalNumberItems) {
      setTotalNumberItems(totalNumberItems);
    }
    
  } catch (err) {
    console.error(err.message);
  }
};
