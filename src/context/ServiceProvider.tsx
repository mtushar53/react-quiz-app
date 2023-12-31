import React, { useState, createContext } from "react";
const ServiceContext = createContext(null);
export const ServiceProvider = ({ children }) => {
  const [data, setData] = useState();
  // useEffect(() => {
  //   if (DummyQuestions) {
  //     const localData = localStorage.getItem("data");
  //     //checking localData's validity
  //     if (
  //       localData !== "undefined" &&
  //       localData !== null &&
  //       localData !== undefined
  //     ) {
  //       setData(JSON.parse(localData));
  //     } else {
  //       localStorage.setItem("data", JSON.stringify(DummyQuestions)); //storeData from local file to loaclStorage
  //       window.location.reload();
  //     }
  //   }
  // }, []);

  return (
    <ServiceContext.Provider
      value={{
        questionsData: { data: data, setData: setData },
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
export default ServiceContext;
